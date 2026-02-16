import { Context } from "koa"
import { analyzeImage } from "../services/gemini";
import fs from "fs";
import path from "path";


export default {
    async analyze(ctx: Context){
        try {
            // Handle different file upload formats
            let file: any;
            
            // Check if file is in request.files (multipart/form-data)
            if (ctx.request.files && ctx.request.files.image) {
                file = ctx.request.files.image;
            } 
            // Check if file is in request.body (form-data)
            else if (ctx.request.body && ctx.request.body.files && ctx.request.body.files.image) {
                file = ctx.request.body.files.image;
            }
            // Check if it's a single file object
            else if (ctx.request.files && !Array.isArray(ctx.request.files)) {
                file = ctx.request.files;
            }

            if(!file) {
                console.log('No file found in request:', {
                    hasFiles: !!ctx.request.files,
                    hasBody: !!ctx.request.body,
                    bodyKeys: ctx.request.body ? Object.keys(ctx.request.body) : []
                });
                return ctx.badRequest('No image uploaded');
            }

            // Get file path - handle different file object structures
            let filePath: string;
            
            if (file.filepath) {
                filePath = file.filepath;
            } else if (file.path) {
                filePath = file.path;
            } else if (typeof file === 'string') {
                filePath = file;
            } else {
                // If file is a buffer, save it temporarily
                const tempDir = path.join(process.cwd(), '.tmp');
                if (!fs.existsSync(tempDir)) {
                    fs.mkdirSync(tempDir, { recursive: true });
                }
                filePath = path.join(tempDir, `upload_${Date.now()}.jpg`);
                fs.writeFileSync(filePath, file);
            }

            // Verify file exists
            if (!fs.existsSync(filePath)) {
                return ctx.badRequest('File not found after upload');
            }

            // Analyze the image
            const result = await analyzeImage(filePath);
            
            // Clean up temporary file if we created it
            if (filePath.includes('.tmp/upload_')) {
                try {
                    fs.unlinkSync(filePath);
                } catch (e) {
                    // Ignore cleanup errors
                }
            }

            return ctx.send({success: true, result});
        } catch (error: any) {
            console.error('Image analysis error:', error);
            return ctx.internalServerError("Analysis failed: " + (error.message || String(error)));
        }
    }
}