package asi.rest.common;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

import asi.model.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * The Class SecurityConfig.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private JwtFilter jwtFilter;

    /**
     * Configure.
     *
     * @param http the http
     * @return the security filter chain
     * @throws Exception the exception
     */
    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // @formatter:off
        http.cors(cors -> cors.disable()).csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(antMatcher("/*")).permitAll()
                .requestMatchers(antMatcher("/static/**")).permitAll()
                .requestMatchers(antMatcher("/assets/**")).permitAll()
                .requestMatchers(antMatcher("/api/hello")).permitAll()
                .requestMatchers(antMatcher("/api/users/signUp")).permitAll()
                .requestMatchers(antMatcher("/api/users/login")).permitAll()
                .requestMatchers(antMatcher("/api/users/loginAdmin")).permitAll()
                .requestMatchers(antMatcher("/api/users/loginStudent")).permitAll()
                .requestMatchers(antMatcher("/api/users/loginTeacher")).permitAll()
                .requestMatchers(antMatcher("/api/teachers/create")).hasRole("ADMIN")
                .requestMatchers(antMatcher("/api/students/create")).hasRole("ADMIN")
                .requestMatchers(antMatcher("/api/classes/create")).hasRole("ADMIN")
                .requestMatchers(antMatcher("/api/schedules/create")).hasRole("ADMIN")
                .requestMatchers(antMatcher("/api/inscriptions/create")).hasRole("ADMIN")
                .requestMatchers(antMatcher("/api/languages")).permitAll()
                .requestMatchers(antMatcher("/api/teachers")).permitAll()
                .requestMatchers(antMatcher("/api/students")).permitAll()
                .requestMatchers(antMatcher("/api/classes")).permitAll()
                .requestMatchers(antMatcher("/api/schedules")).permitAll()
                .requestMatchers(antMatcher("/api/users/loginFromServiceToken")).permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        // @formatter:on

        return http.build();
    }

    /**
     * Authentication manager.
     *
     * @param authenticationConfiguration the authentication configuration
     * @return the authentication manager
     * @throws Exception the exception
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    
    /**
     * Cors configuration source.
     *
     * @return the cors configuration source
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/**", config);

        return source;

    }

}
