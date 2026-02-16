module.exports = (plugin) => {
  // Override the update method to allow users to update their own profile
  plugin.controllers.user.update = async (ctx) => {
    const { id } = ctx.params;
    const user = ctx.state.user;

    // Check if user is authenticated
    if (!user) {
      return ctx.unauthorized('You must be authenticated to update your profile');
    }

    // Check if user is trying to update their own profile
    if (parseInt(id) !== user.id) {
      return ctx.forbidden('You can only update your own profile');
    }

    // Get the data to update (exclude sensitive fields)
    // Handle both wrapped and unwrapped data
    const requestData = ctx.request.body.data || ctx.request.body;
    
    // Remove fields that shouldn't be updated directly
    const allowedFields = ['age', 'weight', 'height', 'goal', 'dailyCalorieIntake', 'dailyCalorieBurn'];
    const updateData = {};
    
    for (const field of allowedFields) {
      if (requestData[field] !== undefined && requestData[field] !== null) {
        updateData[field] = requestData[field];
      }
    }

    // Update the user
    try {
      const updatedUser = await strapi.entityService.update(
        'plugin::users-permissions.user',
        id,
        {
          data: updateData,
          populate: ['role'],
        }
      );

      // Remove sensitive fields before sending response
      const { password, resetPasswordToken, confirmationToken, ...userResponse } = updatedUser;
      
      ctx.body = userResponse;
    } catch (error) {
      ctx.throw(500, error);
    }
  };

  return plugin;
};

