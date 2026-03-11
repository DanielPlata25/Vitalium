package com.modularminds.vittalium.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    //clave secreta (en prod tiene que estar en variables de entorno)
    private static final String SECRET_KEY = "VittaliumSecretKeyParaJWTTieneQueSerMasLargaQCoñoPeroWenoAhiTa1234";
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    //generar token
    public String generateToken(Long userId, String email, Long rolId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("email", email);
        claims.put("rolId", rolId);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    //extraer claims del token
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJwt(token)
                .getBody();
    }

    //extrae email del token
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    //extraer userId del token
    public Long extractUserId(String token) {
        return extractClaims(token).get("userId", Long.class);
    }

    //extraer rolId del token
    public Long extractRolId(String token) {
        return extractClaims(token).get("rolId", Long.class);
    }

    //validar el token
    public Boolean validateToken(String token) {
        try {
            extractClaims(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    //verificar si el token expiró
    private Boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}
