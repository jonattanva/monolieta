package com.monolieta.resource

import com.monolieta.storage.LocalStorageService
import org.springframework.stereotype.Service

@Service("ResourceService")
class ResourceService(
    private val localStorageService: LocalStorageService
) {


}