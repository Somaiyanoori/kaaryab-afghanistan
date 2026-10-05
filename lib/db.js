import { supabase } from "./supabase.js";

// OPPORTUNITIES

export async function createOpportunity(data) {
  try {
    const { data: result, error } = await supabase
      .from("opportunities")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (error) {
    console.error("Database error in createOpportunity:", error);
    throw error;
  }
}

export async function getAllOpportunities() {
  try {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Database query error in getAllOpportunities:",
        error.message,
      );
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Failed to fetch opportunities from database:", error);
    return [];
  }
}

export async function deleteOpportunityById(id) {
  try {
    const { data, error } = await supabase
      .from("opportunities")
      .delete()
      .eq("id", id)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Database error in deleteOpportunityById:", error);
    throw error;
  }
}

export async function updateOpportunityById(id, updates) {
  try {
    const { data, error } = await supabase
      .from("opportunities")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Database error in updateOpportunityById:", error);
    throw error;
  }
}

// SAVED OPPORTUNITIES

export async function saveOpportunityDB(userId, opportunity) {
  try {
    const { error } = await supabase.from("saved_opportunities").upsert(
      [
        {
          user_id: userId,
          opportunity_id: String(opportunity.id),
          opportunity_data: opportunity,
        },
      ],
      {
        onConflict: "user_id,opportunity_id",
        ignoreDuplicates: true,
      },
    );

    if (error) throw error;
  } catch (error) {
    console.error("Database error in saveOpportunityDB:", error);
    throw error;
  }
}

export async function getSavedOpportunitiesDB(userId) {
  try {
    const { data, error } = await supabase
      .from("saved_opportunities")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []).map((item) => item.opportunity_data);
  } catch (error) {
    console.error("Database error in getSavedOpportunitiesDB:", error);
    return [];
  }
}

export async function removeSavedOpportunityDB(userId, opportunityId) {
  try {
    const { error } = await supabase
      .from("saved_opportunities")
      .delete()
      .eq("user_id", userId)
      .eq("opportunity_id", String(opportunityId));

    if (error) throw error;
  } catch (error) {
    console.error("Database error in removeSavedOpportunityDB:", error);
    throw error;
  }
}

export async function clearAllSavedDB(userId) {
  try {
    const { error } = await supabase
      .from("saved_opportunities")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;
  } catch (error) {
    console.error("Database error in clearAllSavedDB:", error);
    throw error;
  }
}

// ============================================
// APPLICATION TRACKER
// ============================================

export async function addToTracker(userId, opportunity, status = "interested") {
  try {
    const { data, error } = await supabase
      .from("application_tracker")
      .upsert(
        [
          {
            user_id: userId,
            opportunity_id: String(opportunity.id),
            opportunity_data: opportunity,
            status,
          },
        ],
        {
          onConflict: "user_id,opportunity_id",
        },
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Database error in addToTracker:", error);
    throw error;
  }
}

export async function getTrackerItems(userId) {
  try {
    const { data, error } = await supabase
      .from("application_tracker")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Database error in getTrackerItems:", error);
    return [];
  }
}

export async function updateTrackerStatus(id, updates) {
  try {
    const { data, error } = await supabase
      .from("application_tracker")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Database error in updateTrackerStatus:", error);
    throw error;
  }
}

export async function removeFromTracker(id) {
  try {
    const { error } = await supabase
      .from("application_tracker")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Database error in removeFromTracker:", error);
    throw error;
  }
}

export async function checkIfTracked(userId, opportunityId) {
  try {
    const { data, error } = await supabase
      .from("application_tracker")
      .select("id, status")
      .eq("user_id", userId)
      .eq("opportunity_id", String(opportunityId))
      .maybeSingle();

    if (error) return null;
    return data;
  } catch (error) {
    console.error("Database error in checkIfTracked:", error);
    return null;
  }
}
