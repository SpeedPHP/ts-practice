package com.example.internal.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FrontUserDO {
    private int uid;
    private String name;
    private String avatar;
}
