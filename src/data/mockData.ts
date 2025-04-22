export interface PDFSummary {
  id: string;
  title: string;
  fileName: string;
  summary: string;
  createdAt: string;
  tags: string[];
}

export const mockPDFSummaries: PDFSummary[] = [
  {
    id: "1",
    title: "Machine Learning Basics",
    fileName: "ml-basics.pdf",
    summary: `
# Machine Learning Basics Summary

This document provides an overview of fundamental machine learning concepts.

## Supervised Learning
Covers algorithms where the model learns from labeled data.  
Examples include:
- **Linear Regression** for predicting continuous values.
- **Classification** tasks such as spam detection.

## Unsupervised Learning
Focuses on discovering patterns in unlabeled data.  
Common techniques:
- Clustering (e.g., K-Means, DBSCAN)
- Dimensionality Reduction (e.g., PCA)

## Neural Networks
Introduces the basics of neural networks, including layers and activation functions.

### Data Preprocessing
Importance of cleaning and transforming data for effective model training, such as:
- Handling missing values
- Feature scaling (normalization/standardization)

### Model Selection
Guidelines for choosing the right model based on problem type and data characteristics.

### Evaluation Metrics
Key metrics for assessing model performance:
1. Accuracy
2. Precision & Recall
3. F1 Score

> Note: Choosing the right metric depends on the problem context.

This summary serves as a quick reference for understanding the core principles of machine learning.

For more details, visit the [Machine Learning Wiki](https://en.wikipedia.org/wiki/Machine_learning).
`,
    createdAt: "2024-03-15T10:30:00Z",
    tags: ["AI", "Machine Learning", "Education"]
  },
  {
    id: "2",
    title: "Project Management Guide",
    fileName: "pm-guide.pdf",
    summary: `
# Project Management Guide Summary

This guide provides a comprehensive overview of project management methodologies.

## Agile
Focuses on iterative development and flexibility in response to changing requirements.

## Scrum
A specific Agile framework with roles, events, and artifacts.

### Team Management
Strategies for building and managing effective project teams, including:
- Clear communication
- Role definition
- Conflict resolution

### Sprint Planning
Techniques for planning and executing sprints within Scrum:
1. Define sprint goals
2. Select backlog items
3. Estimate effort

### Project Tracking
Methods for monitoring project progress:
- Burn-down charts
- Daily stand-ups
- Retrospectives

> *Agile encourages adaptability and continuous improvement.*

This guide is designed to help project managers effectively plan, execute, and deliver successful projects using Agile and Scrum practices.
`,
    createdAt: "2024-03-14T15:45:00Z",
    tags: ["Business", "Management", "Agile"]
  },
  {
    id: "3",
    title: "Research Paper: Climate Change",
    fileName: "climate-research.pdf",
    summary: `
# Climate Change Research Paper Summary

This research paper analyzes recent climate change patterns and their global impact.

## Climate Change Patterns
- Rising global temperatures
- Sea-level rise
- Increased frequency of extreme weather events

## Impact on Ecosystems
Effects on:
- Forests (loss of biodiversity)
- Oceans (coral bleaching)
- Polar regions (ice melt)

### Mitigation Strategies
Key approaches include:
- Reducing greenhouse gas emissions
- Promoting renewable energy
- Enhancing carbon sinks (forests, oceans)

### Future Predictions
Based on current models:
1. Temperature increases of 1.5°C to 4°C by 2100
2. More frequent heatwaves and storms
3. Significant impacts on agriculture and water supply

> **Urgent action is required** to mitigate these effects.

Read the full paper [here](https://climate.nasa.gov/evidence/).
`,
    createdAt: "2024-03-13T09:20:00Z",
    tags: ["Science", "Environment", "Research"]
  },
  {
    id: "4",
    title: "Deep Learning Explained",
    fileName: "deep-learning.pdf",
    summary: `
# Deep Learning Explained Summary

This document provides an overview of deep learning techniques.

## Convolutional Neural Networks (CNNs)
- Primarily used for image recognition and processing.
- Key components: convolutional layers, pooling layers.

## Recurrent Neural Networks (RNNs)
- Designed for sequential data like text and time series.
- Variants include LSTM and GRU.

### Backpropagation
The algorithm used to train neural networks by minimizing error.

### Activation Functions
Common types:
- ReLU
- Sigmoid
- Tanh

### Hyperparameter Tuning
Important hyperparameters:
- Learning rate
- Batch size
- Number of epochs

\`Note:\` Proper tuning is critical for model performance.

This overview is intended to provide a foundational understanding of deep learning methods and their applications.
`,
    createdAt: "2024-02-28T14:15:00Z",
    tags: ["AI", "Deep Learning", "Neural Networks"]
  },
  {
    id: "5",
    title: "Natural Language Processing",
    fileName: "nlp-guide.pdf",
    summary: `
# Natural Language Processing (NLP) Guide Summary

This guide covers key aspects of natural language processing.

## Text Processing
Steps include:
- Tokenization
- Stopword removal
- Lemmatization and stemming

## Sentiment Analysis
Methods for determining sentiment:
- Rule-based approaches
- Machine learning classifiers

## Language Modeling
Building models that can generate or predict text sequences.

### NLP Libraries
Popular libraries:
- [spaCy](https://spacy.io/)
- [NLTK](https://www.nltk.org/)
- [Transformers](https://huggingface.co/transformers/)

> NLP is a rapidly evolving field with many practical applications.

This guide provides a practical introduction to NLP, covering essential techniques and tools for working with text data.
`,
    createdAt: "2024-01-10T09:00:00Z",
    tags: ["AI", "NLP", "Text Analysis"]
  }
];