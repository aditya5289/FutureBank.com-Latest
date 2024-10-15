
        package com.futurebank.authservice.security;

        import java.security.Key;
        import java.util.Arrays;
        import java.util.Date;
        import java.util.List;
        import java.util.stream.Collectors;

        import org.springframework.beans.factory.annotation.Value;
        import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
        import org.springframework.security.core.Authentication;
        import org.springframework.security.core.GrantedAuthority;
        import org.springframework.security.core.authority.SimpleGrantedAuthority;
        import org.springframework.security.core.userdetails.User;
        import org.springframework.security.core.userdetails.UserDetails;
        import org.springframework.stereotype.Component;

import com.futurebank.authservice.config.SecurityConfig;

import io.jsonwebtoken.Claims;
        import io.jsonwebtoken.Jwts;
        import io.jsonwebtoken.SignatureAlgorithm;
        import io.jsonwebtoken.security.Keys;

        @Component
        public class TokenProvider {

            @Value("${app.jwtSecret}")
            private String jwtSecret;

            @Value("${app.jwtExpirationMs}")
            private int jwtExpirationMs;

            private Key getSigningKey() {
                // Assuming SecurityConfig is the class where you defined the getSigningKey method.
                return SecurityConfig.getSigningKey();
            }

            public String generateToken(Authentication authentication) {
                String username = ((UserDetails) authentication.getPrincipal()).getUsername();
                List<String> roles = authentication.getAuthorities().stream()
                                                   .map(GrantedAuthority::getAuthority)
                                                   .collect(Collectors.toList());

                return Jwts.builder()
                        .setSubject(username)
                        .claim("roles", roles)
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                        .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                        .compact();
            }

            public boolean validateToken(String token) {
                try {
                    Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
                    return true;
                } catch (Exception e) {
                    // Log the exception
                }
                return false;
            }

            public Authentication getAuthentication(String token) {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(getSigningKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                String username = claims.getSubject();
                List<SimpleGrantedAuthority> authorities = Arrays.asList();
                var roles = claims.get("roles", List.class);
                if (roles != null) {
                    authorities = (List<SimpleGrantedAuthority>) roles.stream()
                            .map(role -> new SimpleGrantedAuthority((String) role))
                            .collect(Collectors.toList());
                }

                UserDetails principal = new User(username, "", authorities);
                return new UsernamePasswordAuthenticationToken(principal, token, authorities);
            }
        }
