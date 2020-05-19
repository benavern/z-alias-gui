<script>
  import { Link } from '../router'
  import { aliasFile } from '../api'
</script>

<h1>Z Alias</h1>

<div class="card">
  <div class="card__section">
    <p>Made by <Link to="https://benjamin.caradeuc.info" class="btn btn-link">Benjamin Caradeuc</Link></p>

    <p>More info <Link to="https://github.com/benavern/z-alias-gui#readme" class="btn btn-link">on github</Link></p>

    <p>Submit an issue <Link to="https://github.com/benavern/z-alias-gui/issues" class="btn btn-link">here</Link></p>
  </div>

  <div class="card__section">
    <p> Don't forget to add this line to your <code>.bashrc</code> :</p>
  </div>

  <pre><code>if [ -f {aliasFile} ]; then source {aliasFile}; fi</code></pre>
</div>
