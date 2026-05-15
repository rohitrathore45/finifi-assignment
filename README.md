# Finifi — AI-Powered Procurement Reconciliation System

## Overview

Finifi is an AI-powered backend procurement reconciliation system that automates the processing and matching of:

* Purchase Orders (PO)
* Goods Receipt Notes (GRN)
* Invoices

The system extracts structured data from uploaded PDF documents using LLM-based parsing, stores the extracted information in MongoDB, and performs automated three-way matching and reconciliation.

The platform supports:

* out-of-order document uploads
* automated reconciliation
* quantity validation
* mismatch detection
* reconciliation reporting APIs

---

# Features

## AI-Based Document Parsing

* Extracts structured JSON from PDF documents
* Uses LLM-powered intelligent parsing
* Handles semi-structured procurement documents
* Supports PO, GRN, and Invoice parsing

---

## PDF Processing Pipeline

* Upload PDF documents
* Extract raw text using `pdf-parse`
* Convert extracted text into structured procurement JSON

---

## Three-Way Matching Engine

Automatically reconciles:

```text
PO ↔ GRN ↔ Invoice
```

Validation rules implemented:

* GRN quantity must not exceed PO quantity
* Invoice quantity must not exceed GRN quantity
* Invoice quantity must not exceed PO quantity
* Invoice date must not be after PO date

---

## Item-Level Matching

Matching is performed at the item level.

The system primarily uses normalized item descriptions instead of strict SKU matching because procurement documents from different vendors often contain inconsistent or missing item codes.

This approach improves reconciliation reliability for semi-structured real-world procurement documents.

---

## Out-of-Order Upload Support

Documents can arrive in any order:

```text
Invoice → GRN → PO
```

The system:

* stores documents independently
* automatically re-runs reconciliation when related documents arrive
* dynamically updates match results

---

## Mismatch Detection

Detects:

* GRN quantity exceeds PO quantity
* Invoice quantity exceeds GRN quantity
* Invoice quantity exceeds PO quantity
* Invoice date after PO date
* partial document availability

---

## Reporting APIs

Includes:

* Match summary API
* Mismatch reporting API
* Single reconciliation API
* All reconciliation API

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## AI/LLM

* OpenAI API
* Gemini integration reference included

## File Processing

* Multer
* pdf-parse

---

# System Architecture

```text
PDF Upload
    ↓
Text Extraction
    ↓
AI Parsing
    ↓
Structured JSON
    ↓
MongoDB Storage
    ↓
Three-Way Matching Engine
    ↓
Match APIs
```

---

# Folder Structure

```text
src/
│
├── config/
├── controllers/
├── models/
├── prompts/
├── routes/
├── services/
│   ├── ai/
│   └── matching/
├── uploads/
├── utils/
├── app.js
└── server.js
```

---

# API Endpoints

## Upload Document

```http
POST /documents/upload
```

### Form Data

| Key          | Type |
| ------------ | ---- |
| file         | File |
| documentType | Text |

### documentType values

```text
po
grn
invoice
```

---

## Get Parsed Document

```http
GET /documents/:id
```

Returns stored parsed document.

---

# Match APIs

## Get All Match Results

```http
GET /match
```

---

## Get Single Match Result

```http
GET /match/:poNumber
```

---

## Get Only Mismatches

```http
GET /match/mismatches
```

---

## Dashboard Summary

```http
GET /match/summary
```

---

# Sample Parsed PO JSON

```json
{
  "poNumber": "CI4PO05788",
  "poDate": "2026-03-17",
  "vendorName": "M/s AFP",
  "items": [
    {
      "description": "Chicken Momos",
      "quantity": 100
    }
  ]
}
```

---

# Sample Match Result

```json
{
  "poNumber": "CI4PO05788",
  "status": "partially_matched",
  "itemResults": [
    {
      "description": "Chicken Momos",
      "poQuantity": 100,
      "grnQuantity": 80,
      "invoiceQuantity": 0,
      "status": "partially_matched"
    }
  ]
}
```

---

# Setup Instructions

## Clone Repository

```bash
git clone <repo-url>
```

---

## Install Dependencies

```bash
npm install
```

---

## Create Environment File

Create:

```text
.env
```

Add:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
```

---

## Start Server

```bash
npm run dev
```

---

# API Testing

Postman collection is included in the repository:

```text
Finifi.postman_collection.json
```

---

# AI Provider Notes

The assignment originally specified Gemini API integration.

Gemini integration was implemented during development, but OpenAI API was ultimately retained as the primary AI provider because:

* more consistent structured extraction
* better table understanding
* improved JSON formatting
* fewer malformed outputs
* more stable reconciliation results

Gemini-related implementation and configuration references have been intentionally retained for future experimentation and comparison.

---

# Gemini Integration Reference

AI model configuration files:

```text
src/config/openaiClient.js
src/config/geminiClient.js
```

AI extraction services:

```text
src/services/ai/extractPO.js
src/services/ai/extractGRN.js
src/services/ai/extractInvoice.js
```

---

# Assumptions

* PDFs are machine-readable
* Matching primarily uses normalized descriptions
* AI extraction may have minor inconsistencies
* Item codes may vary across vendors
* Quantities are validated during reconciliation

---

# Tradeoffs

* Description-based matching was preferred over strict SKU matching due to inconsistent item codes across procurement documents.
* OpenAI parsing was retained because it produced more stable extraction quality compared to Gemini during testing.
* The project focuses on backend architecture and reconciliation logic rather than frontend visualization.

---

# Future Improvements

* OCR support for scanned PDFs
* Semantic vector-based item matching
* Frontend dashboard
* Human approval workflow
* Async queue processing
* Multi-vendor support
* Docker deployment
* Authentication and RBAC

---

# Key Highlights

* AI-powered procurement reconciliation
* Automated three-way matching engine
* Dynamic reconciliation updates
* Out-of-order document handling
* Real-time mismatch detection
* Reporting and dashboard APIs
* Production-style backend architecture

---

# Author

Rohit Rathore

Final Year Information Science Engineering Student
AI/ML & Backend Development