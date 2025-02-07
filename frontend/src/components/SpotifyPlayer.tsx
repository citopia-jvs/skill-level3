// src/components/SpotifyPlayer.tsx
const SpotifyPlayer: React.FC = () => (
    <div className="spotify-layer">
        <iframe
            src="https://open.spotify.com/embed/track/7xrEnNo99wrmIs8ZK3RZMK?utm_source=generator"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        />
    </div>
);

export default SpotifyPlayer;