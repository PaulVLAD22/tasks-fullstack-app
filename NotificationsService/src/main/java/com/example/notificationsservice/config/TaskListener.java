package com.example.notificationsservice.config;

import com.example.notificationsservice.model.Task;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.concurrent.CopyOnWriteArrayList;

import static com.example.notificationsservice.config.RabbitConfig.TASK_QUEUE;

@Service
@Slf4j
public class TaskListener {

    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @RabbitListener(queues = TASK_QUEUE)
    public void receiveMessage(Task task) {
        log.info("Received task: {}", task);
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("task").data(task));
            } catch (Exception e) {
                emitters.remove(emitter);
            }
        }
    }

    public SseEmitter addEmitter() {
        SseEmitter emitter = new SseEmitter();
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        return emitter;
    }
}

