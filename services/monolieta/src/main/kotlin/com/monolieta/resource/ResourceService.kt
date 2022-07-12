package com.monolieta.resource

import com.monolieta.project.Project
import com.monolieta.storage.LocalStorageService
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import org.springframework.web.multipart.MultipartFile
import java.io.InputStream

@Validated
@Service("ResourceService")
@Transactional(propagation = Propagation.MANDATORY)
class ResourceService(
    private val resourceRepository: ResourceRepository,
    private val localStorageService: LocalStorageService
) {
    @Transactional(propagation = Propagation.REQUIRED)
    fun upload(project: Project, files: List<MultipartFile>) {
        if (!localStorageService.exists(project.key)) {
            if (!localStorageService.createFolder(project.key)) {
                throw Exception("Could not create folder ${project.key}")
            }
        }

        files.forEach { multipart ->
            if (localStorageService.isZip(multipart)) {
                localStorageService.extract(multipart).forEach { input ->
                    upload(project, input)
                }
            } else {
                upload(project, multipart.inputStream)
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    private fun upload(project: Project, inputStream: InputStream): Resource {
        val result = localStorageService.upload(project.key, inputStream)
        val type = result.type.toString()

        return resourceRepository.save(
            Resource(
                id = null,
                name = result.name,
                size = result.size,
                type = type,
                path = result.path,
                project = project
            )
        )
    }
}