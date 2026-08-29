package pl.coderslab.backend.stage;

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

    @GetMapping("/{id}")
    public ResponseEntity<StageDTO> findById(@PathVariable("id") Long id){
        return ResponseEntity.ok(stageService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StageDTO> updateById(@PathVariable("id") Long id, @RequestBody StageDTO stageDTO){
        return ResponseEntity.ok(stageService.updateById(id, stageDTO));
    }
}
