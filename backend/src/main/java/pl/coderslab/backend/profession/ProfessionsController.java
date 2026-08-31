package pl.coderslab.backend.profession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/professions")
public class ProfessionsController {

    private final ProfessionService professionService;

    public ProfessionsController(ProfessionService professionService) {
        this.professionService = professionService;
    }
}
