# 📊 Retail Customer Segmentation & Data Warehouse Pipeline

An end-to-end Business Intelligence and Data Science solution that transforms raw retail transactional data into actionable customer insights using Dimensional Data Warehousing, Machine Learning (RFM K-Means Clustering), and an interactive Power BI Executive Dashboard.

---

## 🏗️ Architecture & Data Flow
 ## ✨ Key Features

* **Dimensional Modeling:** Organized into a clean Star Schema (`Fact_Sales`, `Dim_Customer`, `Dim_Product`, `Dim_Date`) for fast query response and analytical aggregations.
* **Automated Data Mining Pipeline:**
  * **Recency, Frequency, Monetary (RFM)** metric calculation per customer.
  * Machine learning-driven customer segmentation using **K-Means Clustering** ($K=4$).
  * Automatic mapping of clusters to actionable business tiers (*High-Value Champions*, *Loyal Customers*, *At-Risk / Churn Risk*, *Occasional Buyers*).
* **Power BI Dashboard:** Interactive visual analytics featuring drill-downs, segment revenue distributions, customer scatter plots, and YoY DAX measures.

---

## 🛠️ Tech Stack

* **Database / Data Warehouse:** PostgreSQL / SQLite
* **ETL & Data Mining:** Python (`pandas`, `scikit-learn`, `SQLAlchemy`)
* **Visualization & Analytics:** Power BI Desktop (Power Query & DAX)
* **Language:** SQL (DDL/DML), Python 3.x, DAX
