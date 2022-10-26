USE [bookish]
GO

/****** Object:  Table [dbo].[CheckedOut]    Script Date: 26/10/2022 15:32:05 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CheckedOut](
	[ID] [uniqueidentifier] NOT NULL,
	[ISBN] [int]  NOT NULL,
	[userID] [uniqueidentifier] NOT NULL,
	[dueDate] [date] NOT NULL,
	[returned] [tinyint] NOT NULL,
 CONSTRAINT [PK_CheckedOut] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CheckedOut]  WITH CHECK ADD  CONSTRAINT [FK_CheckedOut_Books] FOREIGN KEY([ISBN])
REFERENCES [dbo].[Books] ([ISBN])
GO

ALTER TABLE [dbo].[CheckedOut] CHECK CONSTRAINT [FK_CheckedOut_Books]
GO

ALTER TABLE [dbo].[CheckedOut]  WITH CHECK ADD  CONSTRAINT [FK_CheckedOut_Users] FOREIGN KEY([userID])
REFERENCES [dbo].[Users] ([ID])
GO

ALTER TABLE [dbo].[CheckedOut] CHECK CONSTRAINT [FK_CheckedOut_Users]
GO


