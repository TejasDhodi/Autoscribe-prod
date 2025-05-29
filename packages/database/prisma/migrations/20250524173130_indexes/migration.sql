-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "Workspace_name_idx" ON "Workspace"("name");

-- CreateIndex
CREATE INDEX "WorkspaceUser_userId_idx" ON "WorkspaceUser"("userId");

-- CreateIndex
CREATE INDEX "WorkspaceUser_workspaceId_idx" ON "WorkspaceUser"("workspaceId");

-- CreateIndex
CREATE INDEX "WorkspaceUser_userId_workspaceId_idx" ON "WorkspaceUser"("userId", "workspaceId");

-- CreateIndex
CREATE INDEX "WorkspaceUser_workspaceId_role_idx" ON "WorkspaceUser"("workspaceId", "role");
