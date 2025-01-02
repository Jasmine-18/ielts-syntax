package com.example.ieltsSyntax.DTO;

import com.example.ieltsSyntax.Model.AdvisorType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddAdvisorRequest {

    private String template;
    private AdvisorType type;

}
