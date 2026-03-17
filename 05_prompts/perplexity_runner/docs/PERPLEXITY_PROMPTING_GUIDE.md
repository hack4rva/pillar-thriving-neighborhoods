# Prompt Guide

## Instructions

You can use the `instructions` parameter to provide instructions related to style, tone, and language of the response.

<Warning>
  The real-time search component of our models does not attend to the system prompt.
</Warning>

**Example of a system prompt**

```
You are a helpful AI assistant.

Rules:
1. Provide only the final answer. It is important that you do not include any explanation on the steps below.
2. Do not show the intermediate steps information.

Steps:
1. Decide if the answer should be a brief sentence or a list of suggestions.
2. If it is a list of suggestions, first, write a brief and natural introduction based on the original query.
3. Followed by a list of suggestions, each suggestion should be split by two newlines.
```

## Input

You should use the `input` parameter to pass in the actual query for which you need an answer. The input will be used to kick off a real-time web search to make sure the answer has the latest and the most relevant information needed.

**Example of a user prompt**

```
What are the best sushi restaurants in the world currently?
```

## API Example

```python
from perplexity import Perplexity

client = Perplexity()

response = client.responses.create(
    preset="pro-search",
    input="What are the best sushi restaurants in the world currently?",
    instructions="You are a helpful AI assistant. Provide concise, well-researched answers."
)

print(response.output_text)
```

# Web Search Models: General Prompting Guidelines

Our web search-powered models combine the capabilities of LLMs with real-time web searches. Understanding how they differ from traditional LLMs will help you craft more effective prompts.

## Best Practices for Prompting Web Search Models

Be specific and contextual. Avoid few-shot prompting. Think like a web search user. Provide relevant context concisely.

## Web Search Model Pitfalls to Avoid

- Overly generic questions
- Traditional LLM techniques
- Complex multi-part requests
- Assuming search intent

## Handling URLs and Source Information

<Warning>
  Never ask for URLs or source links in your prompts. Use the `search_results` field of the API response.
</Warning>

## Preventing Hallucination in Search Results

- Use explicit instructions about what to do when information is unavailable.
- Set clear boundaries and request source transparency.

## Use Built-in Search Parameters, Not Prompts

Prefer API parameters like `search_domain_filter` and `web_search_options` to guide search behavior instead of prompt text.

## Tips for Different Query Types

Use domain filters and appropriate context size for factual/technical research; provide style guidance for creative content.

Built with Mintlify.

