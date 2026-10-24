/*
 * SpotifyPlayer
 * Componente independente que monta o player oficial incorporado do Spotify (iframe).
 * Não toca áudio por conta própria e não recria os controles: play, pausa, capa,
 * nome da música e artista vêm do próprio Spotify.
 *
 * Uso no HTML:
 *   <div class="spotify-player" data-spotify-track="0KBTk3lXCtfCfd6ksQIQVz"></div>
 *   <script src="spotify-player.js"></script>
 *
 * Uso no JS:
 *   SpotifyPlayer.mount(elemento, { trackId: '...', height: 152 });
 */
(function (global) {
  'use strict';

  var ID_RE = /^[A-Za-z0-9]{22}$/;

  function mount(container, options) {
    var opts = options || {};
    var id = opts.trackId || container.getAttribute('data-spotify-track') || '';
    if (!ID_RE.test(id)) return null;
    if (container.querySelector('iframe')) return container.querySelector('iframe');

    var frame = document.createElement('iframe');
    frame.src = 'https://open.spotify.com/embed/track/' + id + '?utm_source=generator&theme=0';
    frame.title = opts.title || 'Player do Spotify';
    frame.width = '100%';
    frame.height = String(opts.height || 152);
    frame.setAttribute('frameborder', '0');
    frame.setAttribute('allowfullscreen', '');
    frame.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture');
    frame.loading = 'lazy';
    container.classList.add('spotify-player');
    container.appendChild(frame);
    return frame;
  }

  function mountAll(root) {
    var nodes = (root || document).querySelectorAll('[data-spotify-track]');
    Array.prototype.forEach.call(nodes, function (n) { mount(n); });
  }

  global.SpotifyPlayer = { mount: mount, mountAll: mountAll };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mountAll(); });
  } else {
    mountAll();
  }
})(window);
