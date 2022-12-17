package DH.back_integrador.config;


import DH.back_integrador.model.Roles;
import DH.back_integrador.model.Users;
import DH.back_integrador.repository.RolRepository;
import DH.back_integrador.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtGenerator {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolRepository rolRepository;

    private static final String JWT_SECRET_KEY = "TExBVkVfTVVZX1NFQ1JFVEE=";

    public static final long JWT_TOKEN_VALIDITY = 1000 * 60 * 60 * (long) 360; // 8 Horas


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }



    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        // Agregando informacion adicional como "claim"

        //user
        Users user = userRepository.findByEmail(email);
        String rol = user.getRol().getName();

        claims.put("rol", rol);
        claims.put("id", user.getId());
        claims.put("name", user.getName());
        claims.put("lastname", user.getLastname());
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String subject) {

        return Jwts
                .builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET_KEY)
                .compact();
    }




    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(extractAllClaims(token));
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(JWT_SECRET_KEY).parseClaimsJws(token).getBody();
    }


    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }



}
