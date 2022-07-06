package com.monolieta.bucket

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.services.s3.transfer.TransferManagerBuilder
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.io.InputStream

@Service("AmazonService")
class AmazonService(
    private val client: AmazonS3
) : BucketService() {

    private val logger: Logger = LoggerFactory.getLogger(AmazonService::class.java)

    private val transferManager = TransferManagerBuilder.standard()
        .withS3Client(client)
        .build()

    override fun exists(name: String): Boolean {
        return try {
            client.doesBucketExistV2(name)
        } catch (exception: Exception) {
            logger.error("The file does not exists ($name)", exception)
            false
        }
    }

    override fun createBucket(name: String): Boolean {
        return try {
            client.createBucket(name)
            true
        } catch (exception: Exception) {
            logger.error("Could not create folder ($name)", exception)
            false
        }
    }

    override fun upload(bucket: String, input: InputStream) {
        try {
            val name = generateNewName()
            val mediaType = getContentType(input)

            val metadata = ObjectMetadata()
            metadata.contentType = mediaType?.type

            val transfer = transferManager.upload(bucket, name, input, metadata)
            transfer.waitForUploadResult()
        } catch (exception: Exception) {
            logger.error("Could not upload the file", exception)
        }
    }

}