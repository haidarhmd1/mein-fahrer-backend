import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AWSS3HelperService {
  private s3: S3;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  public async uploadFilesToS3(files: {
    [key: string]: Express.Multer.File[];
  }): Promise<any> {
    const uploadedFiles = {};

    for (const [key, value] of Object.entries(files)) {
      uploadedFiles[key] = await Promise.all(
        value.map(async (file) => {
          try {
            const uploadResult = await this.s3
              .upload({
                Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
                Key: `${Date.now()}-${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
              })
              .promise();

            return uploadResult.Location;
          } catch (error) {
            throw new InternalServerErrorException(
              `Failed to upload ${file.originalname}: ${error.message}`,
            );
          }
        }),
      );
    }

    return uploadedFiles;
  }

  public async uploadSingleFileToS3(
    file: Express.Multer.File,
  ): Promise<string> {
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
          Key: `${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Location;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to upload ${file.originalname}: ${error.message}`,
      );
    }
  }
}
