export class S3Access {
    constructor(){}

    getUploadUrl(todoId: string){
        return(`Upload URL for ${todoId}`)
    }
}