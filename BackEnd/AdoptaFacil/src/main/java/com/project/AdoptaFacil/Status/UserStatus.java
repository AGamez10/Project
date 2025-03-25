package com.project.AdoptaFacil.Status;

public enum UserStatus {
    ACTIVE,
    INACTIVE,
    SUSPENDED;


    @JsonCreator
    public static UserStatus fromString(String value) {
        return UserStatus.valueOf(value.toUpperCase()); // Convierte el string a mayúsculas antes de asignarlo
    }

    @JsonValue
    public String toValue() {
        return name().toUpperCase(); // Asegura que siempre se envíe en mayúsculas
    }
}
