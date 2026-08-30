package pl.coderslab.backend.stage;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stages")
public class StageController {

    private final StageService stageService;

    public StageController(StageService stageService) {
        this.stageService = stageService;
    }

    @GetMapping("")
    public ResponseEntity<List<StageDTO>> findAll(){
        return ResponseEntity.ok(stageService.findAll());
    }

    @PostMapping("")
    public ResponseEntity<StageDTO> create(@Valid @RequestBody StageDTO stageDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(stageService.create(stageDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<StageDTO> findById(@PathVariable("id") Long id){
        return ResponseEntity.ok(stageService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StageDTO> updateById(@PathVariable("id") Long id, @Valid @RequestBody StageDTO stageDTO){
        return ResponseEntity.ok(stageService.updateById(id, stageDTO));
    }

    @DeleteMapping("{/id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id){
        stageService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
