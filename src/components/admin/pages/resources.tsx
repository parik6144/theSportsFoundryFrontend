"use client";
import { userFields, userFormMeta, athleteFields, athleteFormMeta, teamFields, teamFormMeta, academyFields, academyFormMeta, brandFields, brandFormMeta, eventFields, eventFormMeta, blogFields, blogFormMeta, serviceFields, serviceFormMeta, storyFields, storyFormMeta, testimonialFields, testimonialFormMeta, partnerFields, partnerFormMeta, communityFields, communityFormMeta, enquiryFields, enquiryFormMeta, roleFields, roleFormMeta } from "./form-fields";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, XCircle, Star, Edit, Trash2, Plus, RefreshCw } from "lucide-react";
import { PageHeader, NewButton, Badge, DataTable, Card } from "../admin-shell";
import { CRUDModal, type Field } from "../crud-modal";

// Generic API hook for CRUD operations
function useResource<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/${endpoint}`);
      const json = await res.json();
      if (json.success) setData(Array.isArray(json.data) ? json.data : []);
      else setError(json.error || "Failed to fetch");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const create = async (item: any) => {
    const res = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const json = await res.json();
    if (json.success) { await fetchAll(); return true; }
    alert(json.error || "Create failed");
    return false;
  };

  const update = async (id: string, item: any) => {
    const res = await fetch(`/api/${endpoint}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const json = await res.json();
    if (json.success) { await fetchAll(); return true; }
    alert(json.error || "Update failed");
    return false;
  };

  const remove = async (id: string) => {
    const res = await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.success) { await fetchAll(); return true; }
    alert(json.error || "Delete failed");
    return false;
  };

  return { data, loading, error, create, update, remove, refresh: fetchAll };
}

interface ModalState {
  open: boolean;
  mode: "create" | "edit" | "delete";
  data?: any;
}

function ActionIcons({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-1">
      <button onClick={onEdit} className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-[#f4d35e]" title="Edit"><Edit className="h-3.5 w-3.5" /></button>
      <button onClick={onDelete} className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-red-400" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
    </div>
  );
}

function BoolIcon({ value }: { value: boolean }) {
  return value ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-gray-600" />;
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <RefreshCw className="h-6 w-6 text-[#f4d35e] animate-spin" />
      <span className="ml-2 text-sm text-gray-400">Loading from database...</span>
    </div>
  );
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="text-center py-12 max-w-lg mx-auto px-4">
      <p className="text-sm text-red-400 mb-2">⚠ {error}</p>
      <p className="text-xs text-gray-500 mb-3">
        Public marketing pages do not need MySQL. Admin lists need a reachable database — use EC2 admin,
        or remove <code className="text-gray-400">DATABASE_URL</code> from Vercel if it points at a private host.
      </p>
      <button onClick={onRetry} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm">Retry</button>
    </div>
  );
}

/* ============ USERS ============ */

export function UsersPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("users");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    if (modal.mode === "create") await create(formData);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, formData);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Users" subtitle={`${data.length} users registered`} action={<NewButton label="New User" onClick={() => setModal({ open: true, mode: "create", data: {} })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Name", "Email", "Type", "Status", "Verified", "Joined", "Actions"]}
          rows={data.map((u, i) => [
            <span className="font-medium text-white">{u.name}</span>,
            u.email,
            <Badge color={u.userType === "admin" ? "gold" : u.userType === "athlete" ? "green" : "blue"}>{u.userType}</Badge>,
            <Badge color={u.isActive ? "green" : "red"}>{u.isActive ? "Active" : "Inactive"}</Badge>,
            <BoolIcon value={u.isVerified} />,
            new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: u })} onDelete={() => setModal({ open: true, mode: "delete", data: u })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "Add New User" : modal.mode === "edit" ? "Edit User" : "Delete User"} fields={modal.mode === "delete" ? [] : userFields} formMeta={userFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ ATHLETES ============ */

export function AthletesPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("athletes");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    // Ensure stats is JSON string
    const payload = { ...formData, stats: formData.stats || JSON.stringify([]) };
    if (modal.mode === "create") await create(payload);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, payload);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Athletes" subtitle={`${data.length} athletes`} action={<NewButton label="Add Athlete" onClick={() => setModal({ open: true, mode: "create", data: { isActive: true } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Name", "Sport", "Level", "City", "Age", "Verified", "Featured", "Active", "Actions"]}
          rows={data.map((a) => [
            <span className="font-medium text-white">{a.name}</span>,
            <Badge color="blue">{a.sport}</Badge>, <Badge color="purple">{a.level}</Badge>, a.city, a.age,
            <BoolIcon value={a.isVerified} />,
            a.isFeatured ? <Star className="h-4 w-4 text-[#f4d35e] fill-[#f4d35e]" /> : <Star className="h-4 w-4 text-gray-600" />,
            <BoolIcon value={a.isActive} />,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: a })} onDelete={() => setModal({ open: true, mode: "delete", data: a })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "Add Athlete" : modal.mode === "edit" ? "Edit Athlete" : "Delete Athlete"} fields={modal.mode === "delete" ? [] : athleteFields} formMeta={athleteFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ TEAMS ============ */

export function TeamsPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("teams");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    if (modal.mode === "create") await create(formData);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, formData);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Teams" subtitle={`${data.length} teams`} action={<NewButton label="Add Team" onClick={() => setModal({ open: true, mode: "create", data: { isActive: true } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Name", "Sport", "City", "Level", "Open Trials", "Verified", "Active", "Actions"]}
          rows={data.map((t) => [
            <span className="font-medium text-white">{t.name}</span>, <Badge color="blue">{t.sport}</Badge>, t.city, <Badge color="purple">{t.level}</Badge>,
            <BoolIcon value={t.openTrials} />, <BoolIcon value={t.isVerified} />, <BoolIcon value={t.isActive} />,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: t })} onDelete={() => setModal({ open: true, mode: "delete", data: t })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "Add Team" : modal.mode === "edit" ? "Edit Team" : "Delete Team"} fields={modal.mode === "delete" ? [] : teamFields} formMeta={teamFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ ACADEMIES ============ */

export function AcademiesPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("academies");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    const payload = { ...formData, programs: formData.programs || JSON.stringify([]) };
    if (modal.mode === "create") await create(payload);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, payload);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Academies" subtitle={`${data.length} academies`} action={<NewButton label="Add Academy" onClick={() => setModal({ open: true, mode: "create", data: { isPartner: true, isActive: true } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Name", "Sport", "City", "Partner", "Featured", "Active", "Actions"]}
          rows={data.map((a) => [
            <span className="font-medium text-white">{a.name}</span>, <Badge color="blue">{a.sport}</Badge>, a.city,
            <BoolIcon value={a.isPartner} />, a.isFeatured ? <Star className="h-4 w-4 text-[#f4d35e] fill-[#f4d35e]" /> : <Star className="h-4 w-4 text-gray-600" />,
            <BoolIcon value={a.isActive} />,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: a })} onDelete={() => setModal({ open: true, mode: "delete", data: a })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "Add Academy" : modal.mode === "edit" ? "Edit Academy" : "Delete Academy"} fields={modal.mode === "delete" ? [] : academyFields} formMeta={academyFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ BRANDS ============ */

export function BrandsPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("brands");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    if (modal.mode === "create") await create(formData);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, formData);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Brands & Partners" subtitle={`${data.length} brands`} action={<NewButton label="Add Brand" onClick={() => setModal({ open: true, mode: "create", data: { isActive: true } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Name", "Industry", "Partnership Type", "Active", "Actions"]}
          rows={data.map((b) => [
            <span className="font-medium text-white">{b.name}</span>, <Badge color="gray">{b.industry}</Badge>, <Badge color="gold">{b.partnershipType}</Badge>,
            <Badge color={b.isActive ? "green" : "red"}>{b.isActive ? "Active" : "Inactive"}</Badge>,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: b })} onDelete={() => setModal({ open: true, mode: "delete", data: b })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "Add Brand" : modal.mode === "edit" ? "Edit Brand" : "Delete Brand"} fields={modal.mode === "delete" ? [] : brandFields} formMeta={brandFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ EVENTS ============ */

export function EventsPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("events");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    // Convert date strings to ISO
    const payload = {
      ...formData,
      startDate: formData.startDate ? new Date(formData.startDate).toISOString() : new Date().toISOString(),
      endDate: formData.endDate ? new Date(formData.endDate).toISOString() : new Date().toISOString(),
    };
    if (modal.mode === "create") await create(payload);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, payload);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Events & Tournaments" subtitle={`${data.length} events`} action={<NewButton label="Create Event" onClick={() => setModal({ open: true, mode: "create", data: { isActive: true, registrationOpen: true, status: "upcoming" } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Title", "Sport", "Type", "City", "Start Date", "Status", "Registration", "Featured", "Actions"]}
          rows={data.map((e) => [
            <span className="font-medium text-white">{e.title}</span>, <Badge color="blue">{e.sport}</Badge>, <Badge color="purple">{e.eventType}</Badge>,
            e.city, new Date(e.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            <Badge color={e.status === "upcoming" ? "yellow" : "gray"}>{e.status}</Badge>,
            <Badge color={e.registrationOpen ? "green" : "red"}>{e.registrationOpen ? "Open" : "Closed"}</Badge>,
            e.isFeatured ? <Star className="h-4 w-4 text-[#f4d35e] fill-[#f4d35e]" /> : <Star className="h-4 w-4 text-gray-600" />,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: { ...e, startDate: e.startDate?.slice(0, 10), endDate: e.endDate?.slice(0, 10) } })} onDelete={() => setModal({ open: true, mode: "delete", data: e })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "Create Event" : modal.mode === "edit" ? "Edit Event" : "Delete Event"} fields={modal.mode === "delete" ? [] : eventFields} formMeta={eventFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ BLOG ============ */

export function BlogPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("blog-posts");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    const payload = { ...formData, publishedAt: formData.status === "published" ? new Date().toISOString() : null };
    if (modal.mode === "create") await create(payload);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, payload);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Blog / News" subtitle={`${data.length} posts`} action={<NewButton label="New Post" onClick={() => setModal({ open: true, mode: "create", data: { status: "draft" } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Title", "Category", "Status", "Author", "Published", "Featured", "Actions"]}
          rows={data.map((b) => [
            <span className="font-medium text-white">{b.title}</span>, <Badge color="blue">{b.category}</Badge>,
            <Badge color={b.status === "published" ? "green" : "gray"}>{b.status}</Badge>, typeof b.author === "object" && b.author?.name ? b.author.name : (b.author || "—"),
            b.publishedAt ? new Date(b.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—",
            b.isFeatured ? <Star className="h-4 w-4 text-[#f4d35e] fill-[#f4d35e]" /> : <Star className="h-4 w-4 text-gray-600" />,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: b })} onDelete={() => setModal({ open: true, mode: "delete", data: b })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "New Blog Post" : modal.mode === "edit" ? "Edit Blog Post" : "Delete Blog Post"} fields={modal.mode === "delete" ? [] : blogFields} formMeta={blogFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ SERVICES ============ */

export function ServicesPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("services");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    const payload = {
      ...formData,
      bullets: formData.bullets || JSON.stringify([]),
      howItWorks: formData.howItWorks || JSON.stringify([]),
    };
    if (modal.mode === "create") await create(payload);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, payload);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Services" subtitle={`${data.length} service pillars`} action={<NewButton label="New Service" onClick={() => setModal({ open: true, mode: "create", data: { isActive: true, sortOrder: data.length + 1 } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.map((s) => (
            <Card key={s.id} className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#d4af37]/25 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center">
                <span className="text-xs font-mono text-[#f4d35e]">{String(s.sortOrder).padStart(2, "0")}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white">{s.title}</div>
                <div className="text-xs text-gray-500 truncate">{s.tagline}</div>
              </div>
              <Badge color={s.isActive ? "green" : "red"}>{s.isActive ? "Active" : "Inactive"}</Badge>
              <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: s })} onDelete={() => setModal({ open: true, mode: "delete", data: s })} />
            </Card>
          ))}
        </div>
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "New Service" : modal.mode === "edit" ? "Edit Service" : "Delete Service"} fields={modal.mode === "delete" ? [] : serviceFields} formMeta={serviceFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ SUCCESS STORIES ============ */

export function SuccessStoriesPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("success-stories");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    if (modal.mode === "create") await create({ ...formData, publishedAt: new Date().toISOString() });
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, formData);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Success Stories" subtitle={`${data.length} stories`} action={<NewButton label="New Story" onClick={() => setModal({ open: true, mode: "create", data: { isActive: true } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Title", "Subject", "Outcome", "Featured", "Active", "Actions"]}
          rows={data.map((s) => [
            <span className="font-medium text-white">{s.title}</span>, s.subject, <Badge color="gold">{s.outcome}</Badge>,
            s.isFeatured ? <Star className="h-4 w-4 text-[#f4d35e] fill-[#f4d35e]" /> : <Star className="h-4 w-4 text-gray-600" />,
            <Badge color={s.isActive ? "green" : "red"}>{s.isActive ? "Active" : "Inactive"}</Badge>,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: s })} onDelete={() => setModal({ open: true, mode: "delete", data: s })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "New Success Story" : modal.mode === "edit" ? "Edit Success Story" : "Delete Success Story"} fields={modal.mode === "delete" ? [] : storyFields} formMeta={storyFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ TESTIMONIALS ============ */

export function TestimonialsPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("testimonials");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    if (modal.mode === "create") await create(formData);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, formData);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Testimonials" subtitle={`${data.length} testimonials`} action={<NewButton label="New Testimonial" onClick={() => setModal({ open: true, mode: "create", data: { isActive: true } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.map((t) => (
            <Card key={t.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div><div className="font-medium text-white text-sm">{t.name}</div><div className="text-xs text-[#f4d35e]">{t.role}</div></div>
                <Badge color={t.isActive ? "green" : "red"}>{t.isActive ? "Active" : "Inactive"}</Badge>
              </div>
              <p className="text-sm text-gray-400 italic mb-3">"{t.quote}"</p>
              <div className="flex items-center justify-between"><span className="text-xs text-gray-600">Order: {t.sortOrder}</span>
                <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: t })} onDelete={() => setModal({ open: true, mode: "delete", data: t })} />
              </div>
            </Card>
          ))}
        </div>
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "New Testimonial" : modal.mode === "edit" ? "Edit Testimonial" : "Delete Testimonial"} fields={modal.mode === "delete" ? [] : testimonialFields} formMeta={testimonialFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ PARTNERS ============ */

export function PartnersPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("partners");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    if (modal.mode === "create") await create(formData);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, formData);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Partners" subtitle={`${data.length} partners`} action={<NewButton label="Add Partner" onClick={() => setModal({ open: true, mode: "create", data: { isActive: true } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Name", "Tag", "Order", "Active", "Actions"]}
          rows={data.map((p) => [
            <span className="font-medium text-white">{p.name}</span>, <Badge color="blue">{p.tag}</Badge>, p.sortOrder,
            <Badge color={p.isActive ? "green" : "red"}>{p.isActive ? "Active" : "Inactive"}</Badge>,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: p })} onDelete={() => setModal({ open: true, mode: "delete", data: p })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "Add Partner" : modal.mode === "edit" ? "Edit Partner" : "Delete Partner"} fields={modal.mode === "delete" ? [] : partnerFields} formMeta={partnerFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ COMMUNITY ============ */

export function CommunityPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("community-posts");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    if (modal.mode === "create") await create({ ...formData, likesCount: 0, commentsCount: 0 });
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, formData);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Community Posts" subtitle={`${data.length} posts`} action={<NewButton label="New Post" onClick={() => setModal({ open: true, mode: "create", data: { isActive: true } })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Author", "Content", "Tag", "Likes", "Comments", "Pinned", "Active", "Actions"]}
          rows={data.map((p) => [
            <div><div className="font-medium text-white text-sm">{p.authorName}</div><div className="text-xs text-gray-500">{p.authorHandle} · {p.authorRole}</div></div>,
            <span className="text-sm text-gray-400 line-clamp-1 max-w-xs">{p.content}</span>, <Badge color="gold">{p.tag || "—"}</Badge>,
            `❤ ${p.likesCount}`, `💬 ${p.commentsCount}`, p.isPinned ? <Star className="h-4 w-4 text-[#f4d35e] fill-[#f4d35e]" /> : "—",
            <Badge color={p.isActive ? "green" : "red"}>{p.isActive ? "Active" : "Hidden"}</Badge>,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: p })} onDelete={() => setModal({ open: true, mode: "delete", data: p })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "New Community Post" : modal.mode === "edit" ? "Edit Community Post" : "Delete Community Post"} fields={modal.mode === "delete" ? [] : communityFields} formMeta={communityFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ ENQUIRIES ============ */
export function EnquiriesPage() {
  const { data, loading, error, update, remove, refresh } = useResource<any>("enquiries");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "edit" });

  
  const handleSave = async (formData: any) => {
    if (modal.mode === "edit" && modal.data?.id) {
      const payload = { ...formData };
      if (formData.status === "resolved") payload.resolvedAt = new Date().toISOString();
      await update(modal.data.id, payload);
    } else if (modal.mode === "delete" && modal.data?.id) {
      await remove(modal.data.id);
    }
  };

  return (
    <div>
      <PageHeader title="Enquiries" subtitle="All form submissions from contact, partnership, CSR, corporate forms" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[{ label: "New", count: data.filter(e => e.status === "new").length, color: "red" }, { label: "In Progress", count: data.filter(e => e.status === "in_progress").length, color: "yellow" }, { label: "Resolved", count: data.filter(e => e.status === "resolved").length, color: "green" }, { label: "Total", count: data.length, color: "gray" }].map(s => (
          <Card key={s.label} className="p-4"><div className="text-xs text-gray-500 mb-1">{s.label}</div><div className={`text-2xl font-bold ${s.color === "red" ? "text-red-400" : s.color === "yellow" ? "text-amber-400" : s.color === "green" ? "text-emerald-400" : "text-gray-400"}`}>{s.count}</div></Card>
        ))}
      </div>
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Name", "Email", "Type", "Subject", "Status", "Created", "Actions"]}
          rows={data.map((e) => [
            <span className="font-medium text-white">{e.name}</span>, e.email,
            <Badge color={e.type === "corporate" ? "blue" : e.type === "partnership" ? "gold" : "gray"}>{e.type}</Badge>,
            <span className="text-sm text-gray-300 truncate max-w-xs">{e.subject}</span>,
            <Badge color={e.status === "new" ? "red" : e.status === "in_progress" ? "yellow" : "green"}>{e.status === "new" ? "New" : e.status === "in_progress" ? "In Progress" : "Resolved"}</Badge>,
            new Date(e.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: e })} onDelete={() => setModal({ open: true, mode: "delete", data: e })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "edit" ? "Update Enquiry" : "Delete Enquiry"} fields={modal.mode === "delete" ? [] : enquiryFields} formMeta={enquiryFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}

/* ============ ROLES ============ */

export function RolesPage() {
  const { data, loading, error, create, update, remove, refresh } = useResource<any>("roles");
  const [modal, setModal] = useState<ModalState>({ open: false, mode: "create" });

  const handleSave = async (formData: any) => {
    if (modal.mode === "create") await create(formData);
    else if (modal.mode === "edit" && modal.data?.id) await update(modal.data.id, formData);
    else if (modal.mode === "delete" && modal.data?.id) await remove(modal.data.id);
  };

  return (
    <div>
      <PageHeader title="Roles & Permissions" subtitle={`${data.length} roles`} action={<NewButton label="New Role" onClick={() => setModal({ open: true, mode: "create", data: {} })} />} />
      {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={refresh} /> : (
        <DataTable
          headers={["Role", "Display Name", "Users", "Permissions", "Description", "Actions"]}
          rows={data.map((r) => [
            <span className="font-mono text-[#f4d35e]">{r.name}</span>, <span className="font-medium text-white">{r.displayName}</span>,
            <Badge color="blue">{r.guardName}</Badge>, <Badge color="purple">{r.displayName || r.name}</Badge>, <span className="text-sm text-gray-400">{r.description}</span>,
            <ActionIcons onEdit={() => setModal({ open: true, mode: "edit", data: r })} onDelete={() => setModal({ open: true, mode: "delete", data: r })} />,
          ])}
        />
      )}
      <CRUDModal open={modal.open} mode={modal.mode} title={modal.mode === "create" ? "New Role" : modal.mode === "edit" ? "Edit Role" : "Delete Role"} fields={modal.mode === "delete" ? [] : roleFields} formMeta={roleFormMeta} initialData={modal.data} onSave={handleSave} onClose={() => setModal({ ...modal, open: false })} />
    </div>
  );
}
