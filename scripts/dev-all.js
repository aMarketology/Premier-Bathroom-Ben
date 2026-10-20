/**
 * Dev script — starts all 3 sites simultaneously.
 *
 *   premier  → http://localhost:3100
 *   champs   → http://localhost:3101
 *   tilepros → http://localhost:3102
 *
 * Each runs with its own SITE_ID / NEXT_PUBLIC_SITE_ID.
 * Auto-kills any stale process on these ports before starting.
 * Usage: node scripts/dev-all.js
 */

const { spawn, execSync } = require('child_process')

const sites = [
  { name: 'premier',  port: 3100, color: '\x1b[34m' }, // blue
  { name: 'champs',   port: 3101, color: '\x1b[33m' }, // orange
  { name: 'tilepros', port: 3102, color: '\x1b[36m' }, // cyan
]

const reset = '\x1b[0m'

// ── Clean up any stale servers on our ports ─────────────────────────────
function freePorts() {
  for (const s of sites) {
    try {
      // macOS: find PID listening on port and kill it
      const pid = execSync(`lsof -ti :${s.port}`, { encoding: 'utf8' }).trim()
      if (pid) {
        execSync(`kill -9 ${pid.split('\n').join(' ')}`)
        console.log(`   🧹 Freed port ${s.port}`)
      }
    } catch {
      // lsof returns non-zero if nothing is listening — that's fine
    }
  }
}

function start(site) {
  const child = spawn(
    'npx',
    ['next', 'dev', '-p', String(site.port), '-H', '0.0.0.0'],
    {
      stdio: ['inherit', 'pipe', 'pipe'],
      cwd: process.cwd(),
      env: {
        ...process.env,
        SITE_ID: site.name,
        NEXT_PUBLIC_SITE_ID: site.name,
      },
    }
  )

  const prefix = `${site.color}[${site.name}:${site.port}]${reset} `

  child.stdout.on('data', (data) => {
    process.stdout.write(prefix + data.toString().replace(/\n$/, '') + '\n')
  })
  child.stderr.on('data', (data) => {
    process.stderr.write(prefix + data.toString().replace(/\n$/, '') + '\n')
  })
  child.on('exit', (code) => {
    console.log(`${prefix}exited with code ${code}`)
  })
}

console.log('\n🚀 Starting all 3 sites:')
freePorts()
sites.forEach((s) => {
  console.log(`   ${s.color}●${reset} ${s.name.padEnd(10)} → http://localhost:${s.port}`)
})
console.log('')

sites.forEach(start)