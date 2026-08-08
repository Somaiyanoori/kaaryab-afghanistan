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
  const { data, error } = await supabase
    .from("opportunities")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
}

export async function updateOpportunityById(id, updates) {
  const { data, error } = await supabase
    .from("opportunities")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// SAVED OPPORTUNITIES

export async function saveOpportunityDB(userId, opportunity) {
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
}

export async function getSavedOpportunitiesDB(userId) {
  const { data, error } = await supabase
    .from("saved_opportunities")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((item) => item.opportunity_data);
}

export async function removeSavedOpportunityDB(userId, opportunityId) {
  const { error } = await supabase
    .from("saved_opportunities")
    .delete()
    .eq("user_id", userId)
    .eq("opportunity_id", String(opportunityId));

  if (error) throw error;
}

export async function clearAllSavedDB(userId) {
  const { error } = await supabase
    .from("saved_opportunities")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;
}
