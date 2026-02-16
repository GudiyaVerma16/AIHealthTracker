import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Enable permissions for authenticated users
    try {
      const authenticatedRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'authenticated' } });

      if (!authenticatedRole) {
        console.log('Authenticated role not found');
        return;
      }

      // List of permissions to enable
      const permissionsToEnable = [
        'plugin::users-permissions.user.update',
        'api::food-log.food-log.find',
        'api::food-log.food-log.findOne',
        'api::food-log.food-log.create',
        'api::food-log.food-log.update',
        'api::food-log.food-log.delete',
        'api::activity-log.activity-log.find',
        'api::activity-log.activity-log.findOne',
        'api::activity-log.activity-log.create',
        'api::activity-log.activity-log.update',
        'api::activity-log.activity-log.delete',
        'api::image-analysis.image-analysis.find',
        'api::image-analysis.image-analysis.findOne',
        'api::image-analysis.image-analysis.create',
      ];

      for (const action of permissionsToEnable) {
        try {
          // Check if permission already exists
          const existingPermission = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({
              where: {
                action,
                role: authenticatedRole.id,
              },
            });

          if (existingPermission) {
            // Update if disabled
            if (!existingPermission.enabled) {
              await strapi
                .query('plugin::users-permissions.permission')
                .update({
                  where: { id: existingPermission.id },
                  data: { enabled: true },
                });
              console.log(`Enabled permission: ${action}`);
            }
          } else {
            // Create new permission
            await strapi
              .query('plugin::users-permissions.permission')
              .create({
                data: {
                  action,
                  role: authenticatedRole.id,
                  enabled: true,
                },
              });
            console.log(`Created permission: ${action}`);
          }
        } catch (error) {
          console.error(`Error setting up permission ${action}:`, error);
        }
      }
    } catch (error) {
      console.error('Error setting up permissions:', error);
    }
  },
};
