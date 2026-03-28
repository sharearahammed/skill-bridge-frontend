// services/tutor.service.ts

export const getTutorById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allTutors/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tutor");
    }

    return await res.json();
  } catch (error) {
    console.error("Tutor Fetch Error:", error);
    throw error;
  }
};

// Booking function
export const bookTutor = async (availabilityId: string) => {
  console.log("availabilityId", availabilityId);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ availabilityId }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Booking failed");
    }

    return await res.json();
  } catch (error) {
    console.error("Booking Error:", error);
    throw error;
  }
};
