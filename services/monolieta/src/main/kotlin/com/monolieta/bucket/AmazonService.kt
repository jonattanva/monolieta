package com.monolieta.bucket

import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.transfer.TransferManagerBuilder
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

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
}