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
        files.map {
            if (localStorageService.isZip(it)) {
                localStorageService.extract(it).map {
                    upload(project, it)
                }

            }
        }

        // localStorageService.isZip()
    }

    @Transactional(propagation = Propagation.REQUIRED)
    fun upload(project: Project, inputStream: InputStream): Resource {
        val result = localStorageService.upload(
            project.key, inputStream
        )

        return resourceRepository.save(
            Resource(
                id = null,
                name = result.name,
                size = result.size,
                type = result.type.toString(),
                path = result.path,
                project = project
            )
        )
    }
}