import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

import { SignedURLRequest } from '../requests/SignedURLRequest'

const xray = AWSXRay.captureAWS(AWS)

export class S3Access {
    constructor(
        private bucket = process.env.PHOTO_BUCKET,
        private expiration = process.env.BUCKET_EXPIRATION,
        private s3 = new xray.S3({signatureVersion: 'v4'})
    ){}
    async getUploadUrl(todoId: string){
        const request: SignedURLRequest = {
            Bucket: this.bucket,
            Key: todoId,
            Expires: +this.expiration
        }
        console.log('*** S3 Access Layer ***')
        try{
            const uploadURL = await this.s3.getSignedUrlPromise('putObject',request)
            console.log(`Retrieved URL. Returing ${uploadURL}`)
            return uploadURL
        }catch(e){
            console.log(`s3 Upload URL Failed. With error ${e}`)
            return undefined // Will cause an error. That's the idea.
        }

    }
}