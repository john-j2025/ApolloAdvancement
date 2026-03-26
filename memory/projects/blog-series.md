# Blog Series: Everything You Believe About Fundraising is Wrong

**Status:** In progress (intro + 2 of 9 posts drafted)
**Type:** Content marketing / thought leadership
**End goal:** Compile into a PDF booklet lead magnet

## What It Is
A 9-post blog series titled "Everything You Believe About Fundraising is Wrong: 9 Mistakes That Are Killing Your Results." Each post addresses one false belief that nonprofits hold about fundraising. The first six beliefs are about avoiding the act of asking; the last three are about who ducks responsibility for it.

## Posts
| # | Title | Status |
|---|-------|--------|
| Intro | Series landing page / introduction | Drafted and exported (markdown + Word) |
| 1 | Fundraising is Embarrassing | Drafted, revised, exported (markdown + Word) |
| 2 | If We Do Good Work, The Money Will Come | Drafted |
| 3 | We Have to Give People Something in Return | Not started |
| 4 | We Need a Big Event | Not started |
| 5 | Fundraising is Complicated | Not started |
| 6 | We've Already Asked, We Can't Ask Again | Not started |
| 7 | That's the Development Office's Job | Not started |
| 8 | The Executive Director Has More Important Things to Do | Not started |
| 9 | The Board's Job is Governance, Not Fundraising | Not started |

## Completed Assets
- Comprehensive research reference document compiled across all nine beliefs
- Introduction post drafted and exported
- Post #1 drafted, revised, exported with embedded hyperlinks
- Blog header image template developed in HTML/CSS using Apollo brand elements
- Introduction header image: desaturated/sepia photo of woman looking up at "WRONG," positioned right with partial cropping, smooth gradient fade
- Post #1 header image: "Please Help" tin can photo with same treatment, labeled "Mistake #1" with subtitle "The Original Sin That Poisons Everything Else"

## Key Decisions
- Posts #7, #8, #9 intentionally kept as distinct posts (not consolidated) because arts organizations struggle with EDs who resist fundraising
- Post #1 opens with Sasha Dichter's line about being sick of apologizing for raising money (not biographical backstory)
- Post #1 includes a section on the spirituality of fundraising drawing on Henri Nouwen
- Conclusions emphasize organizational transformation, not just individual behavior change
- Storytelling framed as inherently good (producing hope, gratitude, kindness), not merely instrumental to giving

## Visual Standards for Header Images
- Photos pushed to the right with partial cropping for drama
- Smooth left-to-right gradient fades protecting title text on the left
- Heavy desaturation/sepia filtering to harmonize with warm dark palette
- Thin orange rule at top of image
- Ghosted post number in bottom right
- Reject photos with bright competing colors (yellow/blue, green chalkboard)

## Technical Production Notes
HTML-to-image rendering (Playwright):
- Preview: viewport 1400x800
- High-res export: viewport 2400x1260 at 2x device scale factor
- Use page.query_selector('.header-image') then .screenshot() on the element
- wait_for_timeout(1500-2000ms) required for Google Fonts to load before capture

## Not Yet Done
- Posts #3 through #9: drafting, revision, export
- Header images for posts #2 through #9
- Compilation into PDF booklet lead magnet
- Publishing to the website (site currently has no blog/CMS integration)
