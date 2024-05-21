package com.example.gatewayapi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Value("${task.service.uri}")
    private String taskServiceUri;

    @Value("${notification.service.uri}")
    private String notificationServiceUri;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("task_service", r -> r.path("/tasks/**")
                        .uri(taskServiceUri))
                .route("notification_service", r -> r.path("/notifications/**")
                        .uri(notificationServiceUri))
                .build();
    }
}
