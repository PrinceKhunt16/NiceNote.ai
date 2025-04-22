import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import gfm from "remark-gfm";

interface MarkdownRendererProps {
    content: string;
}

const markdownComponents: Components = {
    h1: ({ node, ...props }) => (
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#000" }} {...props} />
    ),
    h2: ({ node, ...props }) => (
        <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#000" }} {...props} />
    ),
    h3: ({ node, ...props }) => (
        <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000" }} {...props} />
    ),
    h4: ({ node, ...props }) => (
        <h4 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#000" }} {...props} />
    ),
    h5: ({ node, ...props }) => (
        <h5 style={{ fontSize: "1rem", fontWeight: "bold", color: "#000" }} {...props} />
    ),
    h6: ({ node, ...props }) => (
        <h6 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#000" }} {...props} />
    ),

    p: ({ node, ...props }) => (
        <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.6 }} {...props} />
    ),

    strong: ({ node, ...props }) => (
        <strong style={{ color: "#000", fontWeight: "bold" }} {...props} />
    ),

    em: ({ node, ...props }) => (
        <em style={{ color: "#6B7280", fontStyle: "italic" }} {...props} />
    ),

    blockquote: ({ node, ...props }) => (
        <blockquote
            style={{
                borderLeft: "4px solid #D1D5DB",
                paddingLeft: "1rem",
                color: "#6B7280",
                fontStyle: "italic",
                margin: "1rem 0",
            }}
            {...props}
        />
    ),

    ul: ({ node, ...props }) => (
        <ul style={{ color: "#4B5563", paddingLeft: "1.25rem", margin: "1rem 0" }} {...props} />
    ),

    ol: ({ node, ...props }) => (
        <ol style={{ color: "#4B5563", paddingLeft: "1.25rem", margin: "1rem 0" }} {...props} />
    ),

    li: ({ node, ...props }) => <li style={{ marginBottom: "0.5rem" }} {...props} />,

    hr: ({ node, ...props }) => (
        <hr style={{ borderColor: "#D1D5DB", margin: "2rem 0" }} {...props} />
    ),

    a: ({ node, ...props }) => (
        <a
            style={{ color: "#2563EB", textDecoration: "underline" }}
            {...props}
            target="_blank"
            rel="noopener noreferrer"
        />
    ),

    img: ({ node, ...props }) => (
        <img style={{ maxWidth: "100%", margin: "1rem 0" }} alt={props.alt} {...props} />
    ),

    table: ({ node, ...props }) => (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                margin: "1rem 0",
                color: "#374151",
            }}
            {...props}
        />
    ),

    th: ({ node, ...props }) => (
        <th
            style={{
                border: "1px solid #D1D5DB",
                padding: "0.5rem 1rem",
                backgroundColor: "#F9FAFB",
                fontWeight: "bold",
                textAlign: "left",
            }}
            {...props}
        />
    ),

    td: ({ node, ...props }) => (
        <td
            style={{
                border: "1px solid #D1D5DB",
                padding: "0.5rem 1rem",
            }}
            {...props}
        />
    ),
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="prose max-w-full">
            <ReactMarkdown remarkPlugins={[gfm]} components={markdownComponents}>
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;