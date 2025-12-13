---
title: "BoardBuddy"
description: "AI-powered medical board companion for UWorld with question insights, recall prompts, and organized study summaries."
pubDate: "2025-04-21"
repo: "https://github.com/blakeyoung/rag-med-tutor"
liveDemo: "https://rag-demo-blake.vercel.app"
tech: ["Medical AI", "Medical Education", "Chrome Extension"]
cover: "/images/projects/board-buddy-hero.png"
---

# RAG-Powered Step 1 Tutor

Medical education often involves memorizing vast amounts of disconnected facts. The traditional approach to studying for high-stakes exams like USMLE Step 1 involves countless hours of flashcards, question banks, and rote memorization. This project aims to transform that experience by creating a more intuitive, conversational learning tool.

## The Problem

When studying complex medical concepts, students often need to:

1. Quickly look up specific facts
2. Understand how concepts connect across different domains (e.g., how biochemistry relates to pathology)
3. Get explanations tailored to their current knowledge level
4. Receive contextually relevant examples

Traditional resources like textbooks and flashcards excel at (1) but struggle with the others. AI tools like ChatGPT can help with (2-4) but may hallucinate or provide outdated medical information.

## The Solution: Retrieval-Augmented Generation

This project combines the best of both worlds by implementing a Retrieval-Augmented Generation (RAG) system that:

- Indexes high-quality, vetted medical education resources
- Retrieves relevant passages based on student queries
- Uses GPT-4 to generate explanations grounded in the retrieved content
- Provides citations back to the original sources

## Technical Implementation

### Vector Database

I used FAISS (Facebook AI Similarity Search) to create embeddings of:
- First Aid for USMLE Step 1 content
- Pathoma chapters
- Selected Boards & Beyond slides

```python
# Sample code for embedding creation
def create_embeddings(text_chunks):
    embeddings = []
    for chunk in text_chunks:
        embedding = openai.Embedding.create(
            input=chunk,
            model="text-embedding-ada-002"
        )
        embeddings.append(embedding['data'][0]['embedding'])
    return np.array(embeddings)
```

### Retrieval Logic

The system uses a hybrid retrieval approach combining:
- Semantic search via vector similarity
- BM25 keyword matching for medical terminology
- A re-ranking step to prioritize the most relevant passages

### Frontend Interface

The Next.js frontend provides:
- A clean, chat-like interface for asking questions
- Toggleable citation view
- Ability to save conversations for later review
- Mobile-friendly design for studying on the go

## Results & Impact

In preliminary testing with 15 medical students:
- 87% reported finding answers faster than with traditional resources
- 92% felt the explanations were more helpful than their usual study materials
- Average study session length increased by 24 minutes

## Future Directions

I'm currently working on:
1. Expanding the knowledge base to include more specialized resources
2. Adding a spaced repetition system to automatically generate review questions
3. Implementing a collaborative feature for study groups
4. Creating specialized modules for different medical specialties

## Try It Yourself

The demo is available at [rag-demo-blake.vercel.app](https://rag-demo-blake.vercel.app). Note that it has a limited knowledge base compared to the full version.

If you're a medical student interested in beta testing the full version, please reach out via the contact form. 