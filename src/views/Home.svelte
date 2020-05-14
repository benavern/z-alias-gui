<script>
  import { Link } from '../router'
  import { getAliases } from '../api'

  let aliases = []
  getAliases().then(list => { aliases = list })

</script>

<h1>Liste des alias</h1>

<pre>{JSON.stringify(aliases, null, 2)}</pre>

<Link to="create">Create</Link>
<Link to="edit">edit</Link>
