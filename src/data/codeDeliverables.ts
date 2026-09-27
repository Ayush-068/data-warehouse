export const PYTHON_SYNTHETIC_DATA_SCRIPT = `"""
================================================================================
RETAIL DATA WAREHOUSE & CUSTOMER SEGMENTATION - SYNTHETIC DATA GENERATOR
Script: generate_synthetic_retail_data.py
Description: Generates realistic raw retail enterprise datasets:
             1. raw_customers.csv (CustomerID, Name, Email, City, Country, SignupDate)
             2. raw_products.csv (ProductID, ProductName, Category, UnitPrice)
             3. raw_orders.csv (OrderID, CustomerID, ProductID, OrderDate, Quantity, Discount)
Architecture: Implements natural RFM behavioral clustering distributions to ensure
              subsequent K-Means segmentation recovers genuine business archetypes.
================================================================================
"""

import sys
import os
import random
from datetime import datetime, timedelta
import numpy as np
import pandas as pd

# Fix random seed for reproducible benchmark datasets
np.random.seed(42)
random.seed(42)

def generate_customers(num_customers: int = 2500) -> pd.DataFrame:
    """
    Generates synthetic customer demographic and account registration records.
    Assigns an underlying latent archetype to ensure realistic long-tail RFM behavior.
    """
    first_names = [
        "Aarav", "Priya", "Rohan", "Ananya", "Vikram", "Neha", "Arjun", "Diya", "Aditya", "Pooja",
        "Kabir", "Ishaan", "Tanvi", "Siddharth", "Kavya", "Aryan", "Meera", "Varun", "Rhea", "Kunal",
        "Emma", "Liam", "Olivia", "Noah", "Ava", "Oliver", "Sophia", "Elijah", "Isabella", "William",
        "Mia", "James", "Charlotte", "Benjamin", "Amelia", "Lucas", "Harper", "Henry", "Evelyn", "Alexander",
        "Abigail", "Mason", "Emily", "Michael", "Elizabeth", "Ethan", "Sofia", "Daniel", "Avery", "Jacob"
    ]
    
    last_names = [
        "Sharma", "Patel", "Mehta", "Iyer", "Singh", "Verma", "Reddy", "Gupta", "Nair", "Joshi",
        "Kapoor", "Malhotra", "Deshmukh", "Rao", "Menon", "Chopra", "Bhatia", "Saxena", "Pillai", "Agarwal",
        "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
        "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
        "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"
    ]
    
    locations = [
        {"city": "Mumbai", "country": "India"},
        {"city": "Bengaluru", "country": "India"},
        {"city": "Delhi", "country": "India"},
        {"city": "Hyderabad", "country": "India"},
        {"city": "Pune", "country": "India"},
        {"city": "Chennai", "country": "India"},
        {"city": "New York", "country": "United States"},
        {"city": "Los Angeles", "country": "United States"},
        {"city": "Chicago", "country": "United States"},
        {"city": "Houston", "country": "United States"},
        {"city": "Toronto", "country": "Canada"},
        {"city": "Vancouver", "country": "Canada"},
        {"city": "London", "country": "United Kingdom"},
        {"city": "Manchester", "country": "United Kingdom"},
        {"city": "Berlin", "country": "Germany"},
        {"city": "Munich", "country": "Germany"},
        {"city": "Sydney", "country": "Australia"},
        {"city": "Melbourne", "country": "Australia"},
        {"city": "Tokyo", "country": "Japan"},
        {"city": "Singapore", "country": "Singapore"}
    ]
    
    domains = ["gmail.com", "outlook.com", "icloud.com", "yahoo.com", "proton.me", "enterprise.org"]
    
    start_date = datetime(2022, 1, 1)
    end_date = datetime(2024, 6, 1)
    date_range_days = (end_date - start_date).days
    
    records = []
    for cid in range(1001, 1001 + num_customers):
        fn = random.choice(first_names)
        ln = random.choice(last_names)
        name = f"{fn} {ln}"
        domain = random.choice(domains)
        email = f"{fn.lower()}.{ln.lower()}{random.randint(10, 999)}@{domain}"
        loc = random.choice(locations)
        
        signup_offset = random.randint(0, date_range_days)
        signup_date = (start_date + timedelta(days=signup_offset)).strftime("%Y-%m-%d")
        
        # Latent archetype weights:
        # 0: Champions (15%) - high freq, high spend, recent
        # 1: Loyal (30%) - moderate-high freq, steady spend
        # 2: At-Risk (25%) - old recency, past high-freq
        # 3: Occasional (30%) - 1-2 orders, variable spend
        archetype = np.random.choice([0, 1, 2, 3], p=[0.15, 0.30, 0.25, 0.30])
        
        records.append({
            "CustomerID": cid,
            "Name": name,
            "Email": email,
            "City": loc["city"],
            "Country": loc["country"],
            "SignupDate": signup_date,
            "_Archetype": archetype
        })
        
    df = pd.DataFrame(records)
    return df


def generate_products() -> pd.DataFrame:
    """
    Generates enterprise product catalog with standard pricing tiers across 5 key retail categories.
    """
    product_catalog = [
        # Electronics
        ("Noise-Cancelling Headphones Pro", "Electronics", 299.99),
        ("Ultra-Slim 4K OLED Monitor 27\\"", "Electronics", 449.50),
        ("Mechanical Wireless Keyboard", "Electronics", 129.99),
        ("Precision Ergonomic Mouse", "Electronics", 79.95),
        ("Smart Home Central Hub", "Electronics", 189.00),
        ("Thunderbolt 4 Docking Station", "Electronics", 219.99),
        ("High-Fidelity Bluetooth Speaker", "Electronics", 149.50),
        ("Fast Wireless Charging Pad 3-in-1", "Electronics", 59.99),
        
        # Apparel
        ("All-Weather Commuter Trench Coat", "Apparel", 220.00),
        ("Merino Wool Knit Crewneck", "Apparel", 115.00),
        ("Performance Stretch Chino", "Apparel", 88.00),
        ("Water-Resistant Trail Jacket", "Apparel", 175.50),
        ("Organic Pima Cotton Tee (3-Pack)", "Apparel", 65.00),
        ("Thermal Compression Baselayer", "Apparel", 48.00),
        ("Italian Leather Chelsea Boot", "Apparel", 245.00),
        
        # Home & Kitchen
        ("Artisan Espresso Machine Dual-Boiler", "Home & Kitchen", 599.00),
        ("Cast Iron Dutch Oven 6-Quart", "Home & Kitchen", 135.00),
        ("Conical Burr Coffee Grinder", "Home & Kitchen", 120.00),
        ("Stainless Steel Chef Knife 8\\"", "Home & Kitchen", 89.95),
        ("Smart Air Purifier HEPA H13", "Home & Kitchen", 169.99),
        ("Double-Walled French Press", "Home & Kitchen", 45.00),
        ("Non-Stick Ceramic Skillet Set", "Home & Kitchen", 110.00),
        
        # Beauty & Health
        ("Sonic Toothbrush Smart Series", "Beauty & Health", 119.00),
        ("Deep Tissue Percussion Massager", "Beauty & Health", 159.00),
        ("Clinical Vitamin C Serum 30ml", "Beauty & Health", 72.00),
        ("Ultra-Hydrating Barrier Cream", "Beauty & Health", 54.00),
        ("Aromatherapy Ultrasonic Diffuser", "Beauty & Health", 39.99),
        ("Bio-Cellulose Face Mask Set", "Beauty & Health", 32.00),
        
        # Sports & Outdoors
        ("Ultralight Carbon Trekking Poles", "Sports & Outdoors", 95.00),
        ("Insulated Stainless Water Bottle 32oz", "Sports & Outdoors", 38.50),
        ("High-Density Eco Yoga Mat 6mm", "Sports & Outdoors", 68.00),
        ("Waterproof Camping Backpack 45L", "Sports & Outdoors", 145.00),
        ("Adjustable Cast Iron Kettlebell", "Sports & Outdoors", 85.00),
        ("GPS Smart Multisport Fitness Watch", "Sports & Outdoors", 349.99)
    ]
    
    records = []
    for pid, (name, category, price) in enumerate(product_catalog, start=5001):
        records.append({
            "ProductID": pid,
            "ProductName": name,
            "Category": category,
            "UnitPrice": round(float(price), 2)
        })
        
    return pd.DataFrame(records)


def generate_orders(customers_df: pd.DataFrame, products_df: pd.DataFrame, total_orders: int = 15000) -> pd.DataFrame:
    """
    Generates realistic historical transactions linked to customer archetypes.
    Assures strong behavioral correlation between recency, frequency, and order values.
    """
    orders = []
    order_id_counter = 100001
    
    now = datetime(2024, 12, 31)
    product_ids = products_df["ProductID"].values
    
    # Pre-index customers by archetype
    champions = customers_df[customers_df["_Archetype"] == 0]
    loyals = customers_df[customers_df["_Archetype"] == 1]
    at_risks = customers_df[customers_df["_Archetype"] == 2]
    occasionals = customers_df[customers_df["_Archetype"] == 3]
    
    # Customer-level order generation loop
    for _, cust in customers_df.iterrows():
        cid = cust["CustomerID"]
        arch = cust["_Archetype"]
        signup_dt = datetime.strptime(cust["SignupDate"], "%Y-%m-%d")
        
        # Decide order count based on archetype
        if arch == 0:  # Champions
            n_orders = np.random.randint(8, 22)
            # Recent orders: between 1 and 45 days ago
            recency_anchor_days = np.random.randint(1, 45)
        elif arch == 1:  # Loyal
            n_orders = np.random.randint(4, 11)
            # Moderate recency: between 15 and 90 days ago
            recency_anchor_days = np.random.randint(15, 90)
        elif arch == 2:  # At-Risk
            n_orders = np.random.randint(3, 9)
            # Inactive for 120 - 365 days
            recency_anchor_days = np.random.randint(120, 365)
        else:  # Occasional
            n_orders = np.random.choice([1, 2, 3], p=[0.65, 0.25, 0.10])
            recency_anchor_days = np.random.randint(20, 300)
            
        last_order_dt = now - timedelta(days=int(recency_anchor_days))
        if last_order_dt < signup_dt:
            last_order_dt = signup_dt + timedelta(days=5)
            
        # Distribute remaining orders between signup and last_order_dt
        if n_orders == 1:
            order_dates = [last_order_dt]
        else:
            time_span_days = max(1, (last_order_dt - signup_dt).days)
            offsets = np.sort(np.random.randint(0, time_span_days, size=n_orders - 1))
            order_dates = [signup_dt + timedelta(days=int(off)) for off in offsets]
            order_dates.append(last_order_dt)
            
        for o_date in order_dates:
            # 1 to 3 items per order basket
            basket_size = np.random.choice([1, 2, 3], p=[0.70, 0.22, 0.08])
            chosen_products = np.random.choice(product_ids, size=basket_size, replace=False)
            
            for pid in chosen_products:
                # Quantity distribution
                if arch == 0:
                    qty = np.random.choice([1, 2, 3, 4], p=[0.40, 0.35, 0.15, 0.10])
                else:
                    qty = np.random.choice([1, 2, 3], p=[0.75, 0.20, 0.05])
                    
                # Discount policy: 0%, 5%, 10%, 15%, 20%
                discount = np.random.choice([0.0, 0.05, 0.10, 0.15, 0.20], p=[0.55, 0.18, 0.15, 0.08, 0.04])
                
                orders.append({
                    "OrderID": order_id_counter,
                    "CustomerID": cid,
                    "ProductID": int(pid),
                    "OrderDate": o_date.strftime("%Y-%m-%d"),
                    "Quantity": int(qty),
                    "Discount": round(float(discount), 2)
                })
            order_id_counter += 1
            
    df_orders = pd.DataFrame(orders)
    return df_orders


def main():
    print("[1/4] Generating synthetic raw customer records...")
    df_customers = generate_customers(num_customers=2500)
    
    print("[2/4] Generating synthetic raw product catalog...")
    df_products = generate_products()
    
    print("[3/4] Generating realistic order transactions with RFM underlying dynamics...")
    df_orders = generate_orders(df_customers, df_products)
    
    # Strip internal generator archetype tag before writing production CSV
    df_customers_clean = df_customers.drop(columns=["_Archetype"])
    
    # Output directory
    output_dir = "./output_csv"
    os.makedirs(output_dir, exist_ok=True)
    
    path_cust = os.path.join(output_dir, "raw_customers.csv")
    path_prod = os.path.join(output_dir, "raw_products.csv")
    path_ord = os.path.join(output_dir, "raw_orders.csv")
    
    df_customers_clean.to_csv(path_cust, index=False)
    df_products.to_csv(path_prod, index=False)
    df_orders.to_csv(path_ord, index=False)
    
    print(f"[4/4] Successfully saved raw CSV files:")
    print(f"  - {path_cust} ({len(df_customers_clean):,} rows)")
    print(f"  - {path_prod} ({len(df_products):,} rows)")
    print(f"  - {path_ord} ({len(df_orders):,} rows)")

if __name__ == "__main__":
    main()
`;

export const SQL_STAR_SCHEMA_DDL = `/*
================================================================================
RETAIL DATA WAREHOUSE - STAR SCHEMA DDL SPECIFICATION
File: create_star_schema.sql
Target RDBMS: ANSI SQL-Compliant (PostgreSQL / Microsoft SQL Server / Snowflake)
Description: Production star schema data warehouse featuring:
             - Dim_Customer (with surrogate key CustomerKey, natural CustomerID, and RFM CustomerSegment)
             - Dim_Product (with ProductKey, natural ProductID, Category, UnitPrice)
             - Dim_Date (with DateKey YYYYMMDD, Calendar Hierarchy, DayOfWeek)
             - Fact_Sales (with SalesKey, Foreign Keys, Measures Quantity & TotalRevenue)
Includes: Primary Keys, Foreign Keys, B-Tree & Analytical Indexes, and Dim_Date Population.
================================================================================
*/

-- -----------------------------------------------------------------------------
-- 0. SCHEMA INITIALIZATION
-- -----------------------------------------------------------------------------
-- CREATE SCHEMA IF NOT EXISTS dwh_retail;
-- SET search_path TO dwh_retail, public;

-- Drop Fact first due to foreign key dependencies
DROP TABLE IF EXISTS Fact_Sales CASCADE;
DROP TABLE IF EXISTS Dim_Customer CASCADE;
DROP TABLE IF EXISTS Dim_Product CASCADE;
DROP TABLE IF EXISTS Dim_Date CASCADE;

-- -----------------------------------------------------------------------------
-- 1. DIMENSION: Dim_Customer
-- -----------------------------------------------------------------------------
CREATE TABLE Dim_Customer (
    CustomerKey       BIGINT GENERATED ALWAYS AS IDENTITY,
    CustomerID        INT NOT NULL,
    Name              VARCHAR(150) NOT NULL,
    Email             VARCHAR(200) NOT NULL,
    City              VARCHAR(100) NOT NULL,
    Country           VARCHAR(100) NOT NULL,
    SignupDate        DATE NOT NULL,
    CustomerSegment   VARCHAR(50) NOT NULL DEFAULT 'Unassigned',
    CreatedAt         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_Dim_Customer PRIMARY KEY (CustomerKey),
    CONSTRAINT UQ_Dim_Customer_CustomerID UNIQUE (CustomerID)
);

-- Optimize dimension lookup and slicing by segment and geography
CREATE INDEX IX_Dim_Customer_CustomerID ON Dim_Customer (CustomerID);
CREATE INDEX IX_Dim_Customer_Segment ON Dim_Customer (CustomerSegment);
CREATE INDEX IX_Dim_Customer_Country_City ON Dim_Customer (Country, City);

-- -----------------------------------------------------------------------------
-- 2. DIMENSION: Dim_Product
-- -----------------------------------------------------------------------------
CREATE TABLE Dim_Product (
    ProductKey        INT GENERATED ALWAYS AS IDENTITY,
    ProductID         INT NOT NULL,
    ProductName       VARCHAR(200) NOT NULL,
    Category          VARCHAR(100) NOT NULL,
    UnitPrice         NUMERIC(12, 2) NOT NULL CHECK (UnitPrice >= 0),
    CreatedAt         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_Dim_Product PRIMARY KEY (ProductKey),
    CONSTRAINT UQ_Dim_Product_ProductID UNIQUE (ProductID)
);

-- Optimize category slice filtering and product lookups
CREATE INDEX IX_Dim_Product_ProductID ON Dim_Product (ProductID);
CREATE INDEX IX_Dim_Product_Category ON Dim_Product (Category);

-- -----------------------------------------------------------------------------
-- 3. DIMENSION: Dim_Date (Role-Playing Calendar Dimension)
-- -----------------------------------------------------------------------------
CREATE TABLE Dim_Date (
    DateKey           INT NOT NULL,            -- Format: YYYYMMDD (e.g., 20240315)
    FullDate          DATE NOT NULL,
    Year              INT NOT NULL,
    Quarter           INT NOT NULL CHECK (Quarter BETWEEN 1 AND 4),
    QuarterName       VARCHAR(10) NOT NULL,    -- Format: Q1, Q2, Q3, Q4
    Month             INT NOT NULL CHECK (Month BETWEEN 1 AND 12),
    MonthName         VARCHAR(20) NOT NULL,    -- Format: January, February...
    MonthYear         VARCHAR(10) NOT NULL,    -- Format: Jan-2024
    DayOfMonth        INT NOT NULL CHECK (DayOfMonth BETWEEN 1 AND 31),
    DayOfWeek         VARCHAR(15) NOT NULL,    -- Format: Monday, Tuesday...
    DayOfWeekNumber   INT NOT NULL CHECK (DayOfWeekNumber BETWEEN 1 AND 7),
    IsWeekend         BOOLEAN NOT NULL,
    CONSTRAINT PK_Dim_Date PRIMARY KEY (DateKey),
    CONSTRAINT UQ_Dim_Date_FullDate UNIQUE (FullDate)
);

CREATE INDEX IX_Dim_Date_Year_Month ON Dim_Date (Year, Month);
CREATE INDEX IX_Dim_Date_FullDate ON Dim_Date (FullDate);

-- -----------------------------------------------------------------------------
-- 4. FACT: Fact_Sales (Transactional Grain: Order Line Item)
-- -----------------------------------------------------------------------------
CREATE TABLE Fact_Sales (
    SalesKey          BIGINT GENERATED ALWAYS AS IDENTITY,
    OrderID           INT NOT NULL,
    DateKey           INT NOT NULL,
    CustomerKey       BIGINT NOT NULL,
    ProductKey        INT NOT NULL,
    Quantity          INT NOT NULL CHECK (Quantity > 0),
    UnitPrice         NUMERIC(12, 2) NOT NULL CHECK (UnitPrice >= 0),
    DiscountRate      NUMERIC(5, 4) NOT NULL DEFAULT 0.0 CHECK (DiscountRate BETWEEN 0.0 AND 1.0),
    DiscountAmount    NUMERIC(12, 2) GENERATED ALWAYS AS (ROUND(Quantity * UnitPrice * DiscountRate, 2)) STORED,
    TotalRevenue      NUMERIC(12, 2) GENERATED ALWAYS AS (ROUND(Quantity * UnitPrice * (1.0 - DiscountRate), 2)) STORED,
    OrderDate         DATE NOT NULL,
    CreatedAt         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT PK_Fact_Sales PRIMARY KEY (SalesKey),
    CONSTRAINT FK_Fact_Sales_Dim_Date FOREIGN KEY (DateKey) REFERENCES Dim_Date (DateKey),
    CONSTRAINT FK_Fact_Sales_Dim_Customer FOREIGN KEY (CustomerKey) REFERENCES Dim_Customer (CustomerKey),
    CONSTRAINT FK_Fact_Sales_Dim_Product FOREIGN KEY (ProductKey) REFERENCES Dim_Product (ProductKey)
);

-- Essential foreign key indexes for High-Performance Star Joins in BI Engines
CREATE INDEX IX_Fact_Sales_DateKey ON Fact_Sales (DateKey);
CREATE INDEX IX_Fact_Sales_CustomerKey ON Fact_Sales (CustomerKey);
CREATE INDEX IX_Fact_Sales_ProductKey ON Fact_Sales (ProductKey);
CREATE INDEX IX_Fact_Sales_OrderID ON Fact_Sales (OrderID);

-- Composite covering index for time-series customer aggregation queries
CREATE INDEX IX_Fact_Sales_Customer_Date_Revenue ON Fact_Sales (CustomerKey, DateKey) INCLUDE (TotalRevenue, Quantity);

-- -----------------------------------------------------------------------------
-- 5. AUTOMATED POPULATION SCRIPT FOR Dim_Date (2020 to 2030)
-- -----------------------------------------------------------------------------
INSERT INTO Dim_Date (
    DateKey,
    FullDate,
    Year,
    Quarter,
    QuarterName,
    Month,
    MonthName,
    MonthYear,
    DayOfMonth,
    DayOfWeek,
    DayOfWeekNumber,
    IsWeekend
)
SELECT 
    CAST(TO_CHAR(d, 'YYYYMMDD') AS INT) AS DateKey,
    d::DATE AS FullDate,
    EXTRACT(YEAR FROM d)::INT AS Year,
    EXTRACT(QUARTER FROM d)::INT AS Quarter,
    'Q' || EXTRACT(QUARTER FROM d)::TEXT AS QuarterName,
    EXTRACT(MONTH FROM d)::INT AS Month,
    TO_CHAR(d, 'Month') AS MonthName,
    TO_CHAR(d, 'Mon-YYYY') AS MonthYear,
    EXTRACT(DAY FROM d)::INT AS DayOfMonth,
    TO_CHAR(d, 'Day') AS DayOfWeek,
    EXTRACT(ISODOW FROM d)::INT AS DayOfWeekNumber,
    CASE WHEN EXTRACT(ISODOW FROM d) IN (6, 7) THEN TRUE ELSE FALSE END AS IsWeekend
FROM GENERATE_SERIES('2020-01-01'::DATE, '2030-12-31'::DATE, '1 day'::INTERVAL) AS d
ON CONFLICT (DateKey) DO NOTHING;
`;

export const POWER_QUERY_PYTHON_ETL = `"""
================================================================================
POWER BI / POWER QUERY EDITOR - PYTHON RFM K-MEANS ETL SCRIPT
Execution Step: In Power Query Editor -> Transform -> Run Python Script
Input DataFrame: 'dataset' (Power BI automatically injects upstream table as 'dataset')
Output DataFrame: Merged table containing 'CustomerSegment', 'Recency', 'Frequency', 'Monetary'
================================================================================
"""

import sys
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# ------------------------------------------------------------------------------
# STEP 1: VERIFY UPSTREAM DATASET INGESTION
# ------------------------------------------------------------------------------
# Power Query passes the active table as a global variable named 'dataset'.
df = dataset.copy()

# Ensure required columns exist
required_columns = {'CustomerID', 'OrderID', 'OrderDate', 'TotalRevenue'}
if not required_columns.issubset(df.columns):
    # Fallback if TotalRevenue was not precomputed in upstream transform
    if 'Quantity' in df.columns and 'UnitPrice' in df.columns:
        discount = df['Discount'] if 'Discount' in df.columns else 0.0
        df['TotalRevenue'] = df['Quantity'] * df['UnitPrice'] * (1.0 - discount)
    else:
        raise ValueError(f"Upstream dataset missing required columns: {required_columns - set(df.columns)}")

# Convert OrderDate to standard pandas datetime
df['OrderDate'] = pd.to_datetime(df['OrderDate'])

# ------------------------------------------------------------------------------
# STEP 2: CALCULATE RAW RFM METRICS PER CUSTOMER
# ------------------------------------------------------------------------------
# Set reference snapshot date (1 day past the maximum transaction date in dataset)
snapshot_date = df['OrderDate'].max() + pd.Timedelta(days=1)

rfm_table = df.groupby('CustomerID').agg({
    'OrderDate': lambda dates: (snapshot_date - dates.max()).days,  # Recency: days since last purchase
    'OrderID': 'nunique',                                           # Frequency: distinct order count
    'TotalRevenue': 'sum'                                           # Monetary: sum of net sales
}).reset_index()

rfm_table.rename(columns={
    'OrderDate': 'Recency',
    'OrderID': 'Frequency',
    'TotalRevenue': 'Monetary'
}, inplace=True)

# Coerce non-negative and finite metrics
rfm_table['Recency'] = rfm_table['Recency'].clip(lower=0)
rfm_table['Frequency'] = rfm_table['Frequency'].clip(lower=1)
rfm_table['Monetary'] = rfm_table['Monetary'].clip(lower=0.01)

# ------------------------------------------------------------------------------
# STEP 3: FEATURE NORMALIZATION (STANDARD SCALER)
# ------------------------------------------------------------------------------
# Log-transform right-skewed Monetary & Frequency features to mitigate extreme outliers
rfm_features = pd.DataFrame()
rfm_features['Recency_Log'] = np.log1p(rfm_table['Recency'])
rfm_features['Frequency_Log'] = np.log1p(rfm_table['Frequency'])
rfm_features['Monetary_Log'] = np.log1p(rfm_table['Monetary'])

scaler = StandardScaler()
rfm_scaled = scaler.fit_transform(rfm_features)

# ------------------------------------------------------------------------------
# STEP 4: FIT K-MEANS CLUSTERING (K = 4)
# ------------------------------------------------------------------------------
kmeans = KMeans(n_clusters=4, init='k-means++', n_init=10, max_iter=300, random_state=42)
rfm_table['Cluster_Raw'] = kmeans.fit_predict(rfm_scaled)

# ------------------------------------------------------------------------------
# STEP 5: ROBUST BUSINESS CENTROID-BASED SEGMENT MAPPING
# ------------------------------------------------------------------------------
# Never rely on arbitrary integer cluster IDs (0, 1, 2, 3), which can shuffle across runs.
# Compute empirical centroids on raw business metrics to determine segment identity deterministically:
centroids = rfm_table.groupby('Cluster_Raw').agg({
    'Recency': 'mean',
    'Frequency': 'mean',
    'Monetary': 'mean'
}).reset_index()

# Sort clusters to identify archetypes:
# 1. 'High-Value Champions': Highest Monetary & Highest Frequency, Low Recency
# 2. 'Loyal Customers': Moderate-to-high Monetary & Frequency, Low-to-Moderate Recency
# 3. 'At-Risk / Churn Risk': High Recency (absent for a long time) but with past spend
# 4. 'Occasional Buyers': Low Frequency, Low Monetary

# Calculate a composite RFM score rank: Higher Frequency & Monetary, Lower Recency
centroids['ValueRank'] = (
    centroids['Monetary'].rank(ascending=False) + 
    centroids['Frequency'].rank(ascending=False) + 
    centroids['Recency'].rank(ascending=True)
)

sorted_centroids = centroids.sort_values(by='ValueRank')
cluster_order = sorted_centroids['Cluster_Raw'].tolist()

# Deterministic assignment based on cluster characteristics
segment_mapping = {}

# Cluster with highest monetary value and high frequency
champion_cluster = centroids.sort_values(by='Monetary', ascending=False).iloc[0]['Cluster_Raw']
segment_mapping[champion_cluster] = 'High-Value Champions'

# Remaining clusters
remaining = centroids[centroids['Cluster_Raw'] != champion_cluster].copy()

# At-Risk has highest recency (longest absence)
at_risk_cluster = remaining.sort_values(by='Recency', ascending=False).iloc[0]['Cluster_Raw']
segment_mapping[at_risk_cluster] = 'At-Risk / Churn Risk'

remaining = remaining[remaining['Cluster_Raw'] != at_risk_cluster].copy()

# Loyal has higher monetary/frequency than occasional
loyal_cluster = remaining.sort_values(by='Monetary', ascending=False).iloc[0]['Cluster_Raw']
segment_mapping[loyal_cluster] = 'Loyal Customers'

remaining = remaining[remaining['Cluster_Raw'] != loyal_cluster].copy()
occasional_cluster = remaining.iloc[0]['Cluster_Raw']
segment_mapping[occasional_cluster] = 'Occasional Buyers'

rfm_table['CustomerSegment'] = rfm_table['Cluster_Raw'].map(segment_mapping)

# ------------------------------------------------------------------------------
# STEP 6: MERGE BACK INTO MAIN DATASET
# ------------------------------------------------------------------------------
# Output table contains original grain enriched with customer segments & RFM attributes
result_df = pd.merge(
    df,
    rfm_table[['CustomerID', 'CustomerSegment', 'Recency', 'Frequency', 'Monetary']],
    on='CustomerID',
    how='left'
)

# Power Query recognizes variables created in script; 'result_df' is our output table
`;

export const POWER_QUERY_M_CODE = `let
    // 1. Ingest base tables from SQL Data Warehouse or CSV sources
    Source = Sql.Database("your-dwh-server.database.windows.net", "RetailDWH"),
    FactSales = Source{[Schema="dbo",Item="Fact_Sales"]}[Data],
    DimCustomer = Source{[Schema="dbo",Item="Dim_Customer"]}[Data],
    
    // 2. Join customer details with sales transactions
    JoinedTransactions = Table.NestedJoin(
        FactSales, {"CustomerKey"},
        DimCustomer, {"CustomerKey"},
        "DimCustomer", JoinKind.Inner
    ),
    ExpandedCustomer = Table.ExpandTableColumn(
        JoinedTransactions, "DimCustomer",
        {"CustomerID", "Name", "City", "Country"},
        {"CustomerID", "CustomerName", "City", "Country"}
    ),
    
    // 3. Execute Python RFM K-Means step
    // The Python script ingests 'dataset' and returns 'result_df'
    RunPythonML = Python.Execute(
        Text.FromBinary(File.Contents("C:\\Scripts\\power_query_rfm_kmeans.py")),
        [dataset = ExpandedCustomer]
    ),
    result_df = RunPythonML{[Name="result_df"]}[Value],
    
    // 4. Set strict Power Query data types
    TypedResult = Table.TransformColumnTypes(result_df, {
        {"SalesKey", Int64.Type},
        {"OrderID", Int64.Type},
        {"CustomerID", Int64.Type},
        {"OrderDate", type date},
        {"TotalRevenue", Currency.Type},
        {"Quantity", Int64.Type},
        {"CustomerSegment", type text},
        {"Recency", Int64.Type},
        {"Frequency", Int64.Type},
        {"Monetary", Currency.Type}
    })
in
    TypedResult`;

export const DAX_MEASURES_CODE = `/*
================================================================================
POWER BI DAX MEASURES LIBRARY - RETAIL CUSTOMER SEGMENTATION & DWH
Table: '_Measures'
Description: Production enterprise DAX measures adhering to Tabular Best Practices:
             - Fully qualified column references 'Table'[Column]
             - Unqualified measure references [Measure]
             - Complete division safety via DIVIDE()
             - Time Intelligence via dedicated 'Dim_Date' dimension
================================================================================
*/

-- =============================================================================
-- 1. CORE SALES & REVENUE MEASURES
-- =============================================================================

Total Revenue = 
SUM ( Fact_Sales[TotalRevenue] )
/* 
Description: Total net revenue earned across transactions.
Format: Currency ($#,##0.00)
Evaluation Context: Slices dynamically across Dim_Date, Dim_Customer, and Dim_Product.
*/

Total Quantity Sold = 
SUM ( Fact_Sales[Quantity] )
/* 
Description: Total units sold across line items.
Format: Whole Number (#,##0)
*/

Total Orders = 
DISTINCTCOUNT ( Fact_Sales[OrderID] )
/* 
Description: Distinct count of customer transaction baskets.
Format: Whole Number (#,##0)
*/

Average Order Value (AOV) = 
DIVIDE (
    [Total Revenue],
    [Total Orders],
    0
)
/* 
Description: Average net dollar value generated per individual order.
Format: Currency ($#,##0.00)
*/

-- =============================================================================
-- 2. CUSTOMER & RFM METRICS
-- =============================================================================

Active Customer Count = 
DISTINCTCOUNT ( Fact_Sales[CustomerKey] )
/* 
Description: Number of distinct customers who transacted within the filtered date context.
Format: Whole Number (#,##0)
*/

Total Registered Customers = 
COUNTROWS ( Dim_Customer )
/* 
Description: Total customer base size in master demographic dimension.
Format: Whole Number (#,##0)
*/

Customer Purchase Frequency = 
DIVIDE (
    [Total Orders],
    [Active Customer Count],
    0
)
/* 
Description: Average orders placed per active customer.
Format: Decimal (0.00)
*/

Customer Lifetime Value (LTV) = 
DIVIDE (
    [Total Revenue],
    [Total Registered Customers],
    0
)
/* 
Description: Average revenue generated per registered customer across the enterprise.
Format: Currency ($#,##0.00)
*/

-- =============================================================================
-- 3. TIME INTELLIGENCE & YoY GROWTH
-- =============================================================================

Prior Year Revenue (PY) = 
CALCULATE (
    [Total Revenue],
    SAMEPERIODLASTYEAR ( Dim_Date[FullDate] )
)
/* 
Description: Total revenue for the identical period in the previous calendar year.
Format: Currency ($#,##0.00)
*/

Revenue YoY Variance = 
[Total Revenue] - [Prior Year Revenue (PY)]
/* 
Description: Absolute dollar increase or decrease compared to prior year.
Format: Currency ($#,##0.00)
*/

YoY Revenue Growth % = 
DIVIDE (
    [Total Revenue] - [Prior Year Revenue (PY)],
    [Prior Year Revenue (PY)],
    BLANK ()
)
/* 
Description: Year-Over-Year percentage change in net revenue. Returns BLANK() if PY is 0 or absent.
Format: Percentage (0.0%)
*/

-- =============================================================================
-- 4. SEGMENTATION & SHARE MEASURES
-- =============================================================================

Total Enterprise Revenue = 
CALCULATE (
    [Total Revenue],
    ALL ( Dim_Customer[CustomerSegment] )
)
/* 
Description: Total revenue removing any slicer filter on CustomerSegment.
Format: Currency ($#,##0.00)
*/

Segment Revenue Share % = 
DIVIDE (
    [Total Revenue],
    CALCULATE ( [Total Revenue], ALLSELECTED ( Dim_Customer[CustomerSegment] ) ),
    0
)
/* 
Description: Percentage of revenue contributed by the active segment relative to all selected segments.
Format: Percentage (0.0%)
*/

Segment Customer Share % = 
DIVIDE (
    [Active Customer Count],
    CALCULATE ( [Active Customer Count], ALLSELECTED ( Dim_Customer[CustomerSegment] ) ),
    0
)
/* 
Description: Proportion of transacting customers belonging to each cluster segment.
Format: Percentage (0.0%)
*/

Avg Recency Days = 
AVERAGEX (
    KEEPFILTERS ( VALUES ( Dim_Customer[CustomerKey] ) ),
    CALCULATE (
        VAR MaxOrderDate = MAX ( Fact_Sales[OrderDate] )
        VAR SnapshotDate = TODAY ()
        RETURN
            IF ( NOT ISBLANK ( MaxOrderDate ), DATEDIFF ( MaxOrderDate, SnapshotDate, DAY ) )
    )
)
/* 
Description: Average days elapsed since the most recent purchase for customers in current filter scope.
Format: Decimal (#,##0.0)
*/
`;

export const POWER_BI_BUILD_MANUAL = `# Power BI Dashboard Build Manual
## Retail Customer Segmentation & Star Schema Data Warehouse
**Target Canvas**: 16:9 Widescreen (1920 x 1080 px or 1280 x 720 px)
**Report Page Title**: Executive Customer Segmentation & Sales Performance

---

### 1. Canvas Setup & Design System Theme

1. **Page Settings**:
   - Canvas Size: **16:9 Widescreen** (Width: 1920 px, Height: 1080 px).
   - Wallpaper: \`#F8FAFC\` (Subtle Cool Slate canvas).
   - Canvas Background: \`#FFFFFF\`, Transparency: 0%.
   - Gridlines: Turn on **Snap to grid**; grid spacing = 8 px.

2. **Enterprise Color Palette (Segment Hex Codes)**:
   - **High-Value Champions**: \`#0D9488\` (Deep Teal)
   - **Loyal Customers**: \`#2563EB\` (Royal Cobalt)
   - **At-Risk / Churn Risk**: \`#E11D48\` (Vibrant Rose)
   - **Occasional Buyers**: \`#F59E0B\` (Warm Amber)
   - **Neutral Structural Elements**: \`#0F172A\` (Header Navy), \`#64748B\` (Muted Text), \`#E2E8F0\` (Dividers)

---

### 2. Slicer & Filter Bar Configuration

- **Position**: Horizontal Top Bar or Collapsible Left Drawer.
- **Dimensions**: X: 32 px, Y: 100 px, Width: 1856 px, Height: 68 px.
- **Slicers Configured**:
  1. **Date Range Slicer**:
     - Field: \`Dim_Date[FullDate]\` (Between slider or Relative Date: Last 12 Months).
     - Title: "Date Range".
  2. **Customer Segment Tile Slicer**:
     - Field: \`Dim_Customer[CustomerSegment]\`.
     - Layout: Button tiles / Horizontal segmented pills.
     - Multi-select with CTRL: Off (Single click toggle with "Select All" option).
  3. **Country Dropdown Slicer**:
     - Field: \`Dim_Customer[Country]\`.
     - Layout: Dropdown search enabled.
  4. **Product Category Slicer**:
     - Field: \`Dim_Product[Category]\`.
     - Layout: Dropdown.

---

### 3. Visual 1: Executive KPI Header Cards (Top Metric Band)

- **Layout**: 5 Side-by-side New Card Visuals (Card (new)).
- **Coordinates**: X: 32 px, Y: 184 px, Total Width: 1856 px, Height: 120 px.
- **Card 1: Total Revenue**
  - Callout Value: \`_Measures[Total Revenue]\` ($#,##0.00).
  - Secondary Reference Metric: \`_Measures[YoY Revenue Growth %]\` (Formatted with positive \`+0.0%\` / negative \`-0.0%\`).
  - Conditional Formatting: If YoY Growth >= 0 then Green (\`#16A34A\`), else Red (\`#DC2626\`).
- **Card 2: Total Orders**
  - Callout Value: \`_Measures[Total Orders]\` (#,##0).
  - Secondary Reference: \`_Measures[Total Quantity Sold]\` ("Units: #,##0").
- **Card 3: Average Order Value (AOV)**
  - Callout Value: \`_Measures[Average Order Value (AOV)]\` ($#,##0.00).
  - Accent Indicator: Teal bar.
- **Card 4: Active Customers**
  - Callout Value: \`_Measures[Active Customer Count]\` (#,##0).
  - Secondary Reference: \`_Measures[Total Registered Customers]\` ("Total Base: #,##0").
- **Card 5: Segment Revenue Share**
  - Callout Value: \`_Measures[Segment Revenue Share %]\` (0.0%).
  - Dynamic Title: Selected Segment Share of Total Sales.

---

### 4. Visual 2: RFM Behavioral Scatter Plot (Center-Left Hero)

- **Visual Type**: Scatter Chart.
- **Coordinates**: X: 32 px, Y: 320 px, Width: 1040 px, Height: 440 px.
- **Field Wells**:
  - **X Axis**: \`Dim_Customer[Recency]\` (Days since last order). Invert Axis: Off (Left = recent, Right = inactive).
  - **Y Axis**: \`Dim_Customer[Monetary]\` (Sum of Total Revenue or Customer Lifetime Spend).
  - **Size**: \`Dim_Customer[Frequency]\` (Total Distinct Order Count).
  - **Legend**: \`Dim_Customer[CustomerSegment]\`.
  - **Tooltips**:
    - \`Dim_Customer[CustomerID]\`
    - \`Dim_Customer[Name]\`
    - \`Dim_Customer[City]\`, \`Dim_Customer[Country]\`
    - \`_Measures[Total Revenue]\`
    - \`_Measures[Total Orders]\`
- **Formatting**:
  - Data Colors: Explicitly set 4 segment colors (Teal, Blue, Rose, Amber).
  - Marker Size: Range from 6 px to 24 px.
  - Analytics Pane: Add **Median X Line** (Median Recency) and **Median Y Line** (Median Monetary) in dashed grey to clearly delineate the 4 quadrants!

---

### 5. Visual 3: Revenue Share Donut Chart (Center-Right Panel)

- **Visual Type**: Donut Chart.
- **Coordinates**: X: 1096 px, Y: 320 px, Width: 792 px, Height: 440 px.
- **Field Wells**:
  - **Legend**: \`Dim_Customer[CustomerSegment]\`.
  - **Values**: \`_Measures[Total Revenue]\`.
  - **Tooltips**: \`_Measures[Total Orders]\`, \`_Measures[Active Customer Count]\`, \`_Measures[Segment Revenue Share %]\`.
- **Formatting**:
  - Detail Labels: **Category, Percent of Total** (Font: Plus Jakarta Sans, 11 pt).
  - Legend: Top-center or Left-center with clean typography.
  - Inner Radius: 60%.
  - Cross-Filtering: Enabled on click to isolate all other charts to the selected segment!

---

### 6. Visual 4: Monthly Revenue Trend by Segment (Bottom Wide Banner)

- **Visual Type**: Line Chart (or Stacked Area Chart).
- **Coordinates**: X: 32 px, Y: 780 px, Width: 1856 px, Height: 260 px.
- **Field Wells**:
  - **X Axis**: \`Dim_Date[Year]\` & \`Dim_Date[MonthName]\` (Continuous or Categorical hierarchy).
  - **Y Axis**: \`_Measures[Total Revenue]\`.
  - **Secondary / Legend**: \`Dim_Customer[CustomerSegment]\`.
  - **Tooltips**: \`_Measures[Total Revenue]\`, \`_Measures[Prior Year Revenue (PY)]\`, \`_Measures[YoY Revenue Growth %]\`.
- **Formatting**:
  - Line stroke width: 2.5 px with subtle data markers on hover.
  - Stepped Layout: Off.
  - Y-Axis: Auto-scaling with compact units ($K, $M).

---

### 7. Interactive Cross-Filtering & Drill-Through Rules

1. **Edit Interactions**:
   - Ensure clicking a slice in **Visual 3 (Donut Chart)** filters **Visual 2 (Scatter Plot)** and **Visual 4 (Line Chart)** rather than merely highlighting.
2. **Customer Drill-Through Page**:
   - Create a secondary report page named **Customer 360 Drillthrough**.
   - Set Drill-through field: \`Dim_Customer[CustomerID]\`.
   - Include a detailed transactional ledger table displaying: OrderID, OrderDate, Product Category, Quantity, UnitPrice, Discount, and NetRevenue.
`;
