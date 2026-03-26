# Prospect List

**File:** Apollo_Prospect_List_v3.xlsx (in Business Operations/)
**Status:** Built, needs ongoing research

## Structure (as of v2, 6 tabs)
- **Tab 1: Catholic Schools** - 13 organizations from the CIOCS directory plus additional Toronto-area schools
- **Tab 2: Christian Schools** - 22 prioritized from ~95 Edvance affiliates, organized by geographic proximity to Peterborough. Key find: Rhema Christian School is in Peterborough itself.
- **Tab 3: Arts Organizations** - 12, filtered for the sweet spot
- **Tab 4: CharityData financial profile template** - Northmount School as example
- **Tab 5: Key associations and networks** - CIOCS, Edvance, Choirs Ontario, etc.
- **Tab 6: Instructions** - How to pull CharityData financials

## HIGH Priority Arts Organizations
- Chorus Niagara
- Cantabile Choirs (Kingston)
- Grand Philharmonic Choir
- Burlington Symphony
- Ottawa Symphony
- Scarborough Philharmonic
- Ontario Philharmonic

## Research Still Needed
- Pull CharityData financials for the 8 HIGH-priority arts organizations to verify sweet-spot fit
- Search for more arts organizations (community theatres, chamber ensembles, music festivals in mid-sized Ontario cities)
- Pull CharityData for Rhema Christian School and Our Lady of the Wayside (Peterborough-based prospects)

## CharityData Research Notes
- CharityData.ca is the preferred financial data source (21 years of data vs. CRA's ~5 years)
- JavaScript-rendered pages; requires browser tools (navigate + get_page_text), not web_fetch
- URL format: charitydata.ca/charity/[name-slug]/[BN-number]/
- Use Google search: site:charitydata.ca "[organization name]" to find the correct BN before navigating
