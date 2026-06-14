/**
 * Doctor Strange Butterfly Effect System
 * Massive glowing green butterfly swarm with flickering and epic spreading
 */

class Butterfly {
  constructor(startX, startY, targetX, targetY, canvas) {
    this.startX = startX
    this.startY = startY
    this.x = startX
    this.y = startY
    this.targetX = targetX
    this.targetY = targetY
    this.canvas = canvas

    // Physics - swarm towards random targets
    this.vx = (Math.random() - 0.5) * 12
    this.vy = (Math.random() - 0.5) * 12 - 1
    this.ax = (Math.random() - 0.5) * 0.4
    this.ay = (Math.random() - 0.5) * 0.3

    // Size and opacity
    this.size = Math.random() * 6 + 4
    this.maxOpacity = Math.random() * 0.9 + 0.5
    this.opacity = this.maxOpacity
    this.life = 1
    this.lifeDecay = Math.random() * 0.006 + 0.003

    // Flickering effect
    this.flickerPhase = Math.random() * Math.PI * 2
    this.flickerSpeed = Math.random() * 0.15 + 0.1
    this.flickerIntensity = Math.random() * 0.5 + 0.3

    // Wing animation
    this.wingPhase = Math.random() * Math.PI * 2
    this.wingFrequency = Math.random() * 0.1 + 0.14
    this.wingAmplitude = Math.random() * 18 + 12

    // Glow
    this.glowSize = this.size * 3.5
    this.color = `hsl(${115 + Math.random() * 30}, ${85 + Math.random() * 15}%, ${50 + Math.random() * 15}%)`

    // Swarm behavior
    this.swarmTime = 0
    this.swarmDuration = Math.random() * 1.5 + 1
  }

  update() {
    // Swarm behavior - move towards targets
    this.swarmTime += 0.016 // ~60fps

    if (this.swarmTime < this.swarmDuration) {
      const dx = this.targetX - this.x
      const dy = this.targetY - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 10) {
        const angle = Math.atan2(dy, dx)
        this.vx += Math.cos(angle) * 0.2
        this.vy += Math.sin(angle) * 0.15
      }
    }

    // Apply acceleration
    this.vx += this.ax
    this.vy += this.ay

    // Heavy damping for chaotic movement
    this.vx *= 0.96
    this.vy *= 0.96

    // Update position
    this.x += this.vx
    this.y += this.vy

    // Bounce off screen edges
    if (this.x < 0) { this.x = 0; this.vx *= -0.5 }
    if (this.x > this.canvas.width) { this.x = this.canvas.width; this.vx *= -0.5 }
    if (this.y < 0) { this.y = 0; this.vy *= -0.5 }
    if (this.y > this.canvas.height) { this.y = this.canvas.height; this.vy *= -0.5 }

    // Decay life
    this.life -= this.lifeDecay

    // Flickering opacity
    this.flickerPhase += this.flickerSpeed
    const flicker = Math.sin(this.flickerPhase) * this.flickerIntensity
    this.opacity = this.maxOpacity * this.life * (1 - this.flickerIntensity + flicker)

    // Wing animation
    this.wingPhase += this.wingFrequency
  }

  draw(ctx) {
    if (this.opacity <= 0 || this.life <= 0) return

    ctx.save()
    ctx.globalAlpha = Math.max(0, this.opacity)
    ctx.translate(this.x, this.y)

    // Wing flapping angle based on phase
    const wingRotation = Math.sin(this.wingPhase) * this.wingAmplitude * 0.02

    // Draw glow with pulsing effect
    const glowPulse = 1 + Math.sin(this.wingPhase) * 0.3
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.glowSize * glowPulse)
    const colorStop0 = this.color.replace('hsl', 'hsla').replace(')', ', 0.8)')
    const colorStop1 = this.color.replace('hsl', 'hsla').replace(')', ', 0.3)')
    const colorStop2 = this.color.replace('hsl', 'hsla').replace(')', ', 0)')

    gradient.addColorStop(0, colorStop0)
    gradient.addColorStop(0.5, colorStop1)
    gradient.addColorStop(1, colorStop2)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(0, 0, this.glowSize * glowPulse, 0, Math.PI * 2)
    ctx.fill()

    // Draw butterfly body
    ctx.fillStyle = this.color

    // Body (center)
    ctx.fillRect(-this.size * 0.15, -this.size * 0.4, this.size * 0.3, this.size * 0.8)

    // Left wings
    ctx.save()
    ctx.rotate(-wingRotation)
    this.drawWing(ctx, -this.size * 0.3, -this.size * 0.1)
    ctx.restore()

    // Right wings
    ctx.save()
    ctx.rotate(wingRotation)
    this.drawWing(ctx, this.size * 0.3, -this.size * 0.1)
    ctx.restore()

    ctx.restore()
  }

  drawWing(ctx, x, y) {
    // Upper wing
    ctx.beginPath()
    ctx.ellipse(x, y - this.size * 0.2, this.size * 0.35, this.size * 0.25, 0, 0, Math.PI * 2)
    ctx.fill()

    // Lower wing
    ctx.beginPath()
    ctx.ellipse(x, y + this.size * 0.2, this.size * 0.3, this.size * 0.2, 0, 0, Math.PI * 2)
    ctx.fill()

    // Wing shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.beginPath()
    ctx.ellipse(x, y - this.size * 0.15, this.size * 0.15, this.size * 0.1, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  isAlive() {
    return this.life > 0
  }
}

export class ButterflyEffectSystem {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.butterflies = []
    this.animationId = null
    this.isRunning = false
    this.onComplete = null
  }

  init() {
    if (this.canvas) return

    // Create canvas
    this.canvas = document.createElement('canvas')
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `

    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d', { alpha: true })

    // Set canvas resolution
    this.resize()

    // Handle window resize
    window.addEventListener('resize', () => this.resize())
  }

  resize() {
    if (!this.canvas) return
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  spawnMassiveSwarm(callback) {
    this.init()
    this.onComplete = callback

    // Massive butterfly count - spread across entire screen
    const butterflyCount = 60 + Math.floor(Math.random() * 40) // 60-100 butterflies

    // Spawn butterflies from all edges and random positions
    for (let i = 0; i < butterflyCount; i++) {
      let startX, startY, targetX, targetY

      // Random spawn locations - from edges and scattered
      const spawnSide = Math.floor(Math.random() * 5)
      switch (spawnSide) {
        case 0: // Top edge
          startX = Math.random() * this.canvas.width
          startY = -20
          break
        case 1: // Bottom edge
          startX = Math.random() * this.canvas.width
          startY = this.canvas.height + 20
          break
        case 2: // Left edge
          startX = -20
          startY = Math.random() * this.canvas.height
          break
        case 3: // Right edge
          startX = this.canvas.width + 20
          startY = Math.random() * this.canvas.height
          break
        default: // Scattered inside
          startX = Math.random() * this.canvas.width
          startY = Math.random() * this.canvas.height
      }

      // Random target positions (scattered across screen)
      targetX = Math.random() * this.canvas.width
      targetY = Math.random() * this.canvas.height

      this.butterflies.push(new Butterfly(startX, startY, targetX, targetY, this.canvas))
    }

    if (!this.isRunning) {
      this.isRunning = true
      this.animate()
    }
  }

  animate() {
    // Clear canvas - maintain trails for ethereal effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Update and draw butterflies
    for (let i = this.butterflies.length - 1; i >= 0; i--) {
      const butterfly = this.butterflies[i]
      butterfly.update()
      butterfly.draw(this.ctx)

      if (!butterfly.isAlive()) {
        this.butterflies.splice(i, 1)
      }
    }

    // Continue animation if butterflies exist
    if (this.butterflies.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate())
    } else {
      this.isRunning = false
      // Keep canvas for a moment, then clear
      setTimeout(() => {
        if (this.ctx) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }
      }, 500)

      // Call completion callback
      if (this.onComplete) {
        this.onComplete()
      }
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
    this.butterflies = []
    this.canvas = null
    this.ctx = null
    this.isRunning = false
    this.onComplete = null
  }
}

// Singleton instance
let systemInstance = null

export function getButterflyEffectSystem() {
  if (!systemInstance) {
    systemInstance = new ButterflyEffectSystem()
  }
  return systemInstance
}
