# Shopify Metaobject Setup for Events

## Overview
This guide explains how to set up the Event metaobject in Shopify Admin to enable the "Add Event" functionality in the Events section.

## Steps to Create Event Metaobject

### 1. Navigate to Metaobjects in Shopify Admin
1. Go to **Settings** → **Custom Data** → **Metaobjects**
2. Click **"Add metaobject definition"**

### 2. Create the Event Metaobject

**Basic Configuration:**
- **Name:** `Event` (required)
- **Type name:** `event` (required - lowercase, no spaces)
- **Namespace and key:** Choose one:
  - Option A: Leave default `custom.event`
  - Option B: Use `padel_ready.event`

### 3. Add Fields (Per PRD Section 3.4.2)

Add the following fields to your Event metaobject:

| Field Name | Type | Validation | Required |
|------------|------|------------|----------|
| `title` | Single line text | - | ✅ Yes |
| `date` | Date | - | ✅ Yes |
| `location` | Single line text | - | ✅ Yes |
| `description` | Multi-line text or Rich text | - | ✅ Yes |
| `image` | File (image) | - | ⚠️ Optional |
| `type` | Single select | Tournament / Training / Social | ✅ Yes |
| `status` | Single select | Upcoming / Past | ✅ Yes |
| `register_url` | URL | - | ⚠️ Optional |
| `featured` | Boolean | - | ⚠️ Optional |

### 4. Enable Storefront Access

**IMPORTANT:** Check "Shopify manages this metafield" to enable Liquid access:
- Go to **Settings** → **Custom Data** → **Metafields**
- Find each field you created
- Check **"Shopify manages this metafield"** for each field
- For the image field, ensure it's set to "Accessible in storefront"

### 5. Save and Test

1. Click **"Save"**
2. Return to your Events page in Theme Editor
3. The events grid should now pull from your metaobjects
4. If events don't appear, check the console for Liquid errors

## Adding Events

### Method 1: Via Shopify Admin
1. Go to **Content** → **Metaobjects** → **Events**
2. Click **"Add event"**
3. Fill in all fields:
   - **Title:** e.g., "Members' Summer Social"
   - **Date:** Select date
   - **Location:** e.g., "Babington House Lawn"
   - **Description:** Rich text description
   - **Image:** Upload event image
   - **Type:** Select "Tournament", "Training", or "Social"
   - **Status:** Select "Upcoming" or "Past"
   - **Register URL:** Link to registration form (optional)
   - **Featured:** Check if this is a featured event
4. Click **"Save"**

### Method 2: Via Theme Editor (Section Blocks)
1. Go to **Online Store** → **Themes** → **Customize**
2. Navigate to your Events page
3. Select the "PR Events Grid" section
4. Click **"Add block"**
5. Select **"Event"** block type
6. Fill in the fields
7. Click **"Save"**

## Troubleshooting

### Events Not Showing

**Problem:** Events metaobject data not displaying in grid.

**Solution 1:** Check metaobject namespace
- Our Liquid code tries multiple namespaces:
  - `shop.metaobjects.event.values`
  - `shop.metaobjects.events.values`
  - `shop.metaobjects.padel_ready_events.values`

**Solution 2:** Verify storefront access
- Go to **Settings** → **Custom Data** → **Metaobjects**
- Open your Event metaobject
- Ensure "Storefront access" is enabled

**Solution 3:** Check field visibility
- In your metaobject definition, ensure all fields have "Accessible in storefront" enabled

### Namespace Mismatch

**Problem:** Wrong namespace in Liquid code.

**Fix:** The section tries multiple namespaces automatically. If your metaobject is under a different namespace, you can add it to the fallback list in `sections/pr-events-grid.liquid`:

```liquid
{% if events.size == 0 %}
  {% assign events = shop.metaobjects.your_namespace.your_key.values %}
{% endif %}
```

### Field Access Errors

**Problem:** Liquid errors when accessing fields.

**Solution:** Ensure fields are accessible:
1. Go to **Settings** → **Custom Data** → **Metaobjects**
2. Click on your Event metaobject
3. For each field, click **"Edit"**
4. Under "Storefront access", check "Shopify manages this metafield"
5. Save changes

## Example Event

Here's an example of a properly configured event:

**Title:** Members' Summer Social

**Date:** June 8, 2025

**Location:** Babington House Lawn

**Description:**
Drinks, music, and padel under the evening sun. An exclusive members-only gathering celebrating the start of summer.

**Image:** `assets/soho-house-hero.webp`

**Type:** Social

**Status:** Upcoming

**Register URL:** https://shop.padelready.store/events/summer-social

**Featured:** Yes

## Validation

After setup, verify:
- ✅ Events appear in Events grid
- ✅ Filtering (Upcoming/Past) works
- ✅ Event cards link to detail pages
- ✅ "Register" button links to correct URL
- ✅ Featured events display correctly
- ✅ Images load from Shopify CDN

## Next Steps

1. Create 3-5 sample events for testing
2. Test both "Upcoming" and "Past" filters
3. Verify event detail pages load correctly
4. Test registration flow
5. Check mobile responsiveness

## Support

If issues persist:
1. Check Shopify Admin → Online Store → Themes → Actions → View Logs
2. Look for Liquid syntax errors
3. Verify metaobject fields match exactly what's in the Liquid code
4. Check browser console for JavaScript errors

---

**Last Updated:** Current
**Shopify Version:** Online Store 2.0+
**PRD Reference:** Section 3.4.2 Events Data Model + Shopify Integration
