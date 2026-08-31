package pl.coderslab.backend.play;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/plays")
public class PlayController {
    private final PlayService service;

    @GetMapping("")
    public ResponseEntity<List<PlayDTO>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping("")
    public ResponseEntity<PlayDTO> create(@Valid @RequestBody PlayDTO playDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(playDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayDTO> findById(@PathVariable("id") Long id){
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlayDTO> updateById(@PathVariable("id") Long id, @Valid @RequestBody PlayDTO playDTO){
        return ResponseEntity.ok(service.updateById(id, playDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
