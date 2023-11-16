package asi.rest.common;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/**
 * The Class JwtGeneratorImpl.
 */
@Component
public class JwtGeneratorImpl implements JwtGenerator {

    /** The sign key. */
    @Value("${project.jwt.signKey}")
    private String signKey;

    /** The expiration minutes. */
    @Value("${project.jwt.expirationMinutes}")
    private long expirationMinutes;

    /**
     * Generate.
     *
     * @param info the info
     * @return the string
     */
    @Override
    public String generate(JwtInfo info) {

        Claims claims = Jwts.claims();

        claims.setSubject(info.getUserName())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMinutes * 60 * 1000));
        claims.put("userId", info.getUserId());
        claims.put("role", info.getRole());
        
        return Jwts.builder().setClaims(claims).signWith(Keys.hmacShaKeyFor(signKey.getBytes()), SignatureAlgorithm.HS512).compact();

    }

    /**
     * Gets the info.
     *
     * @param token the token
     * @return the info
     */
    @Override
    public JwtInfo getInfo(String token) {
        
        Claims claims = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(signKey.getBytes())).build().parseClaimsJws(token).getBody();

        return new JwtInfo(((Integer) claims.get("userId")).longValue(), claims.getSubject(),
                (String) claims.get("role"));

    }

}
