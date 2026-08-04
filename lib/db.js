import { supabase } from "./supabase.js";

// OPPORTUNITIES

export async function createOpportunity(data) {
  const { data: result, error } = await supabase
    .from("opportunities")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getAllOpportunities() {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteOpportunityById(id) {
  console.log("DB: Deleting opportunity with id:", id);

  const { data, error } = await supabase
    .from("opportunities")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("DB Delete error:", error);
    throw error;
  }

  console.log("DB: Delete result:", data);
  return data;
}

// SAVED OPPORTUNITIES

export async function saveOpportunityDB(userId, opportunity) {
  const { error } = await supabase.from("saved_opportunities").insert([
    {
      user_id: userId,
      opportunity_id: opportunity.id,
      opportunity_data: opportunity,
    },
  ]);

  if (error) throw error;
}

export async function getSavedOpportunitiesDB(userId) {
  const { data, error } = await supabase
    .from("saved_opportunities")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data.map((item) => item.opportunity_data);
}

export async function removeSavedOpportunityDB(userId, opportunityId) {
  const { error } = await supabase
    .from("saved_opportunities")
    .delete()
    .eq("user_id", userId)
    .eq("opportunity_id", opportunityId);

  if (error) throw error;
}

export async function clearAllSavedDB(userId) {
  const { error } = await supabase
    .from("saved_opportunities")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
}

export async function updateOpportunityById(id, updates) {
  console.log("DB: Updating opportunity:", id, updates);

  const { data, error } = await supabase
    .from("opportunities")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("DB Update error:", error);
    throw error;
  }

  console.log("DB: Update result:", data);
  return data;
}
