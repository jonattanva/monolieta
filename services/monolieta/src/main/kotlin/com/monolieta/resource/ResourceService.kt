package com.monolieta.resource

import com.monolieta.project.Project
import com.monolieta.storage.LocalStorageService
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Slice
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import org.springframework.validation.annotation.Validated
import org.springframework.web.multipart.MultipartFile
import java.io.InputStream
import javax.validation.Valid

@Validated
@Service("ResourceService")
@Transactional(propagation = Propagation.MANDATORY)
class ResourceService(
    private val resourceRepository: ResourceRepository,
    private val localStorageService: LocalStorageService
) {
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    fun paginate(pageable: Pageable): Slice<Resource> {
        return resourceRepository.paginate(pageable)
    }

    @Transactional(propagation = Propagation.REQUIRED)
    fun upload(@Valid project: Project, files: List<MultipartFile>) {
        if (!localStorageService.exists(project.key)) {
            if (!localStorageService.createFolder(project.key)) {
                throw Exception("Could not create folder ${project.key}")
            }
        }

        files.forEach { file ->
            if (localStorageService.isZip(file)) {
                localStorageService.extract(file).forEach { input ->
                    upload(project, input)
                }
            } else {
                upload(project, file.inputStream)
            }
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    private fun upload(project: Project, inputStream: InputStream): Resource {
        val file = localStorageService.upload(project.key, inputStream)
        val type = file.type.toString()

        return resourceRepository.save(
            Resource(
                id = null,
                name = file.name,
                size = file.size,
                type = type,
                path = file.path,
                project = project
            )
        )
    }
}