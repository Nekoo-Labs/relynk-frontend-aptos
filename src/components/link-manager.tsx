"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit3,
  Trash2,
  BarChart3,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  isActive: boolean;
  clicks: number;
  icon: string;
}

interface LinkManagerProps {
  links: Link[];
  onLinksUpdate: (links: Link[]) => void;
}

export function LinkManager({ links, onLinksUpdate }: LinkManagerProps) {
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    icon: "🔗",
  });

  const handleAddLink = () => {
    if (!formData.title || !formData.url) return;

    const newLink: Link = {
      id: Date.now().toString(),
      title: formData.title,
      url: formData.url,
      description: formData.description,
      isActive: true,
      clicks: 0,
      icon: formData.icon,
    };

    onLinksUpdate([...links, newLink]);
    setFormData({ title: "", url: "", description: "", icon: "🔗" });
    setIsAddingLink(false);
  };

  const handleEditLink = () => {
    if (!editingLink || !formData.title || !formData.url) return;

    const updatedLinks = links.map((link) =>
      link.id === editingLink.id
        ? {
            ...link,
            title: formData.title,
            url: formData.url,
            description: formData.description,
            icon: formData.icon,
          }
        : link
    );

    onLinksUpdate(updatedLinks);
    setEditingLink(null);
    setFormData({ title: "", url: "", description: "", icon: "🔗" });
  };

  const handleDeleteLink = (linkId: string) => {
    const updatedLinks = links.filter((link) => link.id !== linkId);
    onLinksUpdate(updatedLinks);
  };

  const handleToggleActive = (linkId: string) => {
    const updatedLinks = links.map((link) =>
      link.id === linkId ? { ...link, isActive: !link.isActive } : link
    );
    onLinksUpdate(updatedLinks);
  };

  const handleMoveLink = (linkId: string, direction: "up" | "down") => {
    const currentIndex = links.findIndex((link) => link.id === linkId);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === links.length - 1)
    ) {
      return;
    }

    const newLinks = [...links];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    [newLinks[currentIndex], newLinks[targetIndex]] = [
      newLinks[targetIndex],
      newLinks[currentIndex],
    ];

    onLinksUpdate(newLinks);
  };

  const openEditDialog = (link: Link) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      url: link.url,
      description: link.description,
      icon: link.icon,
    });
  };

  const openAddDialog = () => {
    setIsAddingLink(true);
    setFormData({ title: "", url: "", description: "", icon: "🔗" });
  };

  const closeDialogs = () => {
    setIsAddingLink(false);
    setEditingLink(null);
    setFormData({ title: "", url: "", description: "", icon: "🔗" });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Links</CardTitle>
              <CardDescription>
                Manage your link-in-bio links. Drag to reorder.
              </CardDescription>
            </div>
            <Dialog open={isAddingLink} onOpenChange={setIsAddingLink}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                  <Plus className="w-4 h-4" />
                  Add Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Link</DialogTitle>
                  <DialogDescription>
                    Create a new link for your profile
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="icon">Icon (Emoji)</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          icon: e.target.value,
                        }))
                      }
                      placeholder="🔗"
                      maxLength={2}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="My Website"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={formData.url}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                      placeholder="https://example.com"
                      type="url"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description of this link"
                      rows={2}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={closeDialogs}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddLink}>Add Link</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {links.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <div className="mb-4">
                <Plus className="w-12 h-12 mx-auto opacity-50" />
              </div>
              <p className="text-lg font-medium mb-2">No links yet</p>
              <p className="text-sm mb-4">Add your first link to get started</p>
              <Button onClick={openAddDialog}>
                <Plus className="w-4 h-4" />
                Add Your First Link
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {links.map((link, index) => (
                <div
                  key={link.id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => handleMoveLink(link.id, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => handleMoveLink(link.id, "down")}
                      disabled={index === links.length - 1}
                    >
                      <ChevronDown />
                    </Button>
                  </div>

                  <div className="text-lg">{link.icon}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium truncate">{link.title}</h4>
                      {!link.isActive && (
                        <Badge variant="secondary" className="text-xs">
                          Hidden
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {link.url}
                    </p>
                    {link.description && (
                      <p className="text-xs text-muted-foreground truncate">
                        {link.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart3 className="w-4 h-4" />
                    {link.clicks}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleActive(link.id)}
                      title={link.isActive ? "Hide link" : "Show link"}
                    >
                      {link.isActive ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>

                    <Dialog
                      open={editingLink?.id === link.id}
                      onOpenChange={(open) => !open && closeDialogs()}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(link)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Link</DialogTitle>
                          <DialogDescription>
                            Update your link details
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-icon">Icon (Emoji)</Label>
                            <Input
                              id="edit-icon"
                              value={formData.icon}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  icon: e.target.value,
                                }))
                              }
                              placeholder="🔗"
                              maxLength={2}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={formData.title}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  title: e.target.value,
                                }))
                              }
                              placeholder="My Website"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-url">URL</Label>
                            <Input
                              id="edit-url"
                              value={formData.url}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  url: e.target.value,
                                }))
                              }
                              placeholder="https://example.com"
                              type="url"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-description">
                              Description (Optional)
                            </Label>
                            <Textarea
                              id="edit-description"
                              value={formData.description}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              placeholder="Brief description of this link"
                              rows={2}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={closeDialogs}>
                            Cancel
                          </Button>
                          <Button onClick={handleEditLink}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteLink(link.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
