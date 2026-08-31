package pl.coderslab.backend.profession;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professions")
public class ProfessionController {

    private final ProfessionService service;

    public ProfessionController(ProfessionService professionService) {
        this.service = professionService;
    }

    @GetMapping("")
    public ResponseEntity<List<ProfessionDTO>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("")
    public ResponseEntity<ProfessionDTO> create(@Valid @RequestBody ProfessionDTO professionDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(professionDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessionDTO> findById(@PathVariable("id") Long id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessionDTO> updateById(@PathVariable("id") Long id, @Valid @RequestBody ProfessionDTO professionDTO){
        return ResponseEntity.ok(service.updateById(id, professionDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
