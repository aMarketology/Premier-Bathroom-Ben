# ObjectWire CLI Writing Agent

A specialized writing agent CLI tool for ObjectWire.org - An investigative journalism network.

## 🎯 Overview

This CLI tool helps journalists and editors at ObjectWire create, manage, and publish articles in a semi-automated fashion. It connects directly to your Next.js website to manage content in real-time.

## 📋 Features

- **Article Creation**: Generate article templates for different categories
- **Real-time Updates**: Push content directly to your Next.js site
- **Category Management**: Support for all ObjectWire categories
  - Investigations
  - Technology
  - Business & Finance
  - Opinion & Analysis
  - Health
  - Startup News
- **Source Citation**: Built-in source verification and citation tools
- **Editorial Workflow**: 3-stage review process support
- **Breaking News**: Fast-track urgent stories
- **Metadata Management**: SEO, tags, authors, timestamps

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Configuration

Create a `.env.local` file:

```env
OBJECTWIRE_API_URL=https://objectwire.org/api
OBJECTWIRE_API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_key_here
EDITOR_NAME=Your Name
```

### Usage

```bash
# Create a new article
npm run create-article

# Update existing article
npm run update-article

# Publish article
npm run publish

# Interactive mode
npm run write
```

## 📝 Article Categories

- **FRAUD INVESTIGATION** - Major fraud cases and investigations
- **SPECIAL REPORT** - In-depth investigative pieces
- **CRIME** - Crime reporting and analysis
- **LEGAL** - Legal developments and court cases
- **TECH** - Technology news and analysis
- **POLITICS** - Political coverage
- **STARTUPS** - Startup ecosystem news
- **PROFILE** - People and company profiles

## 🔧 CLI Commands

### Create Article
```bash
objectwire create --category investigations --title "Your Title"
```

### Draft Mode
```bash
objectwire draft --file article.md
```

### Publish
```bash
objectwire publish --article-id 123 --priority breaking
```

### Update
```bash
objectwire update --article-id 123 --content "New content"
```

## 📦 Project Structure

```
objectwire-cli/
├── cli/
│   ├── commands/
│   │   ├── create.ts      # Create new articles
│   │   ├── update.ts      # Update existing articles
│   │   ├── publish.ts     # Publish to live site
│   │   └── draft.ts       # Draft management
│   ├── templates/
│   │   ├── investigation.ts
│   │   ├── breaking.ts
│   │   ├── analysis.ts
│   │   └── opinion.ts
│   └── utils/
│       ├── api.ts         # API client
│       ├── validator.ts   # Content validation
│       └── formatter.ts   # Content formatting
├── content/
│   ├── drafts/            # Work in progress
│   ├── published/         # Published articles
│   └── archives/          # Historical content
└── config/
    └── categories.json    # Category definitions
```

## 🎨 Article Template

```typescript
interface Article {
  id: string
  title: string
  slug: string
  category: Category
  tags: string[]
  author: Author
  publishDate: Date
  content: string
  sources: Source[]
  status: 'draft' | 'review' | 'published'
  priority: 'breaking' | 'featured' | 'standard'
}
```

## 🔐 Editorial Standards

All articles must include:
- ✅ Source citations
- ✅ Author byline
- ✅ Category classification
- ✅ Publication date
- ✅ Editorial review status

## 📊 Workflow

1. **Create** - Generate article template
2. **Draft** - Write and edit content
3. **Review** - 3-stage editorial review
4. **Publish** - Push to live site
5. **Update** - Real-time corrections if needed

## 🌐 Integration

Connects to ObjectWire Next.js backend via REST API:

```
POST   /api/articles       - Create article
PUT    /api/articles/:id   - Update article
DELETE /api/articles/:id   - Delete article
GET    /api/articles       - List articles
```

## 👥 Team

Designed for the ObjectWire Investigations team in Austin, Texas.

## 📄 License

Proprietary - ObjectWire 2025-2026

---

**ObjectWire** - Precision intelligence for professionals who demand verified, source-cited reporting.
