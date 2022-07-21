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
    fun upload(project: Project, files: List<MultipartFile>): List<Resource> {
        val result = arrayListOf<Resource>()
        files.forEach {
            result.addAll(upload(project, it.inputStream))
        }
        return result
    }

    @Transactional(propagation = Propagation.REQUIRED)
    fun upload(project: Project, inputStream: InputStream): List<Resource> {
        val result = arrayListOf<Resource>()
        if (localStorageService.isZip(inputStream)) {
            localStorageService.extract(inputStream).forEach {
                result.add(save(project, it))
            }
        } else {
            result.add(save(project, inputStream))
        }
        return result
    }

    @Transactional(propagation = Propagation.REQUIRED)
    private fun save(@Valid project: Project, inputStream: InputStream): Resource {
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