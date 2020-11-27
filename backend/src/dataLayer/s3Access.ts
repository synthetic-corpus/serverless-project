
import { SignedURLRequest } from '../requests/SignedURLRequest'
import { S3 } from 'aws-sdk'
export class S3Access {
    constructor(
        private bucket = process.env.PHOTO_BUCKET,
        private expiration = process.env.BUCKET_EXPIRATION,
        private s3 = new S3({signatureVersion: 'v4'})
    ){}
    async getUploadUrl(todoId: string){
        const request: SignedURLRequest = {
            Bucket: this.bucket,
            Key: todoId,
            Expires: this.expiration
        }
        return this.s3.getSignedUrlPromise('putObject',request)
    }
}